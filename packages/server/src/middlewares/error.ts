import { type ErrorRequestHandler } from "express"
import { config } from "dotenv"

config()

export const errorMiddleware: ErrorRequestHandler = (err, _, res, next) => {
   if (err) {
      res.status(res.statusCode).json({
         error: {
            message: err.message,
            stack: process.env.NODE_ENV === "development" ? err.stack : undefined
         }
      })
   }

   next()
}