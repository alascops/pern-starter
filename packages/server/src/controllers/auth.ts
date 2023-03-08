import { RequestHandler } from "express"
import asyncHandler from "express-async-handler"
import { z } from "zod"
import { prisma } from "@config/prisma"
import { compare } from "bcrypt"

export const check: RequestHandler = asyncHandler(async (req, res) => {
   const { userId: id } = req.session

   if (!id) {
      res.status(200).json(null)
      return
   }

   const fetch = await prisma.user.findFirst({
      where: {
         id
      }
   })

   res.status(200).json(fetch)
})

export const authenticate: RequestHandler = asyncHandler(async (req, res) => {
   const validation = z.object({
      identity: z.string().trim().optional(),
      password: z.string().trim().min(8).max(15)
   })

   const result = validation.safeParse(req.body)

   if (!result.success) {
      throw result.error
   }

   const fetch = await prisma.user.findFirst({
      where: {
         OR: [{
            username: result.data.identity,
         }, {
            emailAddress: result.data.identity
         }]
      }
   })

   if (!fetch) {
      throw new Error("Authentication Failed!")
   }

   const match = await compare(result.data.password, fetch.password)

   if (!match) {
      throw new Error("Authentication Failed!")
   }

   const sessions = await prisma.session.findMany()

   if (!sessions) {
      throw new Error("Authentication Failed!")
   }

   const inSession = sessions.map((session) => JSON.parse(session.data))
      .find((session) => session.userId === fetch.id)

   if (inSession) {
      throw new Error("Already logged in!")
   }

   req.session.userId = fetch.id

   res.status(200).json(fetch)
})

export const deauthenticate: RequestHandler = asyncHandler(async (req, res) => {
   const destroy = await req.session.destroy(() => {})
  
   if (!destroy.userId) {
      throw new Error("No one is currently logged in!")
   }

   res.clearCookie("connect.sid")

   res.status(200).json(destroy.userId)
})