import session, { type CookieOptions, type SessionOptions } from "express-session"
import { config } from "dotenv"
import { store } from "@config/prisma"

config()

const cookieOptions: CookieOptions = {
   httpOnly: true,
   maxAge: 24 * 60 * 60 * 1000,
   secure: process.env.NODE_ENV === "production",
   sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
}

const sessionOptions: SessionOptions = {
   cookie: cookieOptions,
   resave: true,
   rolling: true,
   saveUninitialized: false,
   secret: process.env.SESSION_SECRET_KEY.split(" "),
   store: store
}

export const sessionMiddleware = session(sessionOptions)