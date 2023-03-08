import { RequestHandler } from "express"
import asyncHandler from "express-async-handler"
import { z } from "zod"
import { prisma } from "@config/prisma"

export const fetchUserFavorites: RequestHandler = asyncHandler(async (req, res) => {
   const validation = z.object({
      id: z.string({ invalid_type_error: "ID must be a string." })
         .min(1, "ID is required.")
   })

   const result = validation.safeParse(req.params)

   if (!result.success) {
      throw result.error
   }

   const fetch = await prisma.favorite.findMany({
      where: {
         id: result.data.id
      }
   })

   if (!fetch) {
      throw new Error("Failed to fetch user favorites.")
   }

   res.status(200).json(fetch)
})