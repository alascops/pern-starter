import { Router } from "express"
import { check, authenticate, deauthenticate } from "@controllers/auth"

export const authRouter = Router()

authRouter.get("/check", check)
authRouter.post("/authenticate", authenticate)
authRouter.delete("/deauthenticate", deauthenticate)