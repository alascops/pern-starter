import { RequestHandler } from "express"
import asyncHandler from "express-async-handler"
import { z } from "zod"
import { prisma } from "@config/prisma"
import { genSalt, hash } from "bcrypt"

export const fetch: RequestHandler = asyncHandler(async (req, res) => {
   const validation = z.object({
      id: z.string().trim().min(1)
   })

   const result = validation.safeParse(req.params)

   if (!result.success) {
      throw new Error("Failed to fetch user.")
   }

   const fetch = await prisma.user.findFirst({
      where: {
         id: result.data.id
      }
   })

   if (!fetch) {
      throw new Error("Failed to fetch user.")
   }

   res.status(200).json(fetch)
})

export const fetchAll: RequestHandler = asyncHandler(async (_, res) => {
   const fetch = await prisma.user.findMany()

   if (!fetch) {
      throw new Error("Failed to fetch users.")
   }

   res.status(200).json(fetch)
})

export const create: RequestHandler = asyncHandler(async (req, res) => {
   const validation = z.object({
      username: z.string().trim().min(1).max(15),
      emailAddress: z.string().trim().email().max(320),
      password: z.string().trim().min(8).max(15)
   })

   const result = validation.safeParse(req.body)

   if (!result.success) {
      throw result.error
   }

   const create = await prisma.user.create({
      data: {
         username: result.data.username,
         emailAddress: result.data.emailAddress,
         password: await hash(result.data.password, await genSalt(16))
      }
   })

   if (!create) {
      throw new Error("Failed to create new user.")
   }

   res.status(201).json(create)
})