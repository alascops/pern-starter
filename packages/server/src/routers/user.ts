import { Router } from "express"
import { create, fetch, fetchAll } from "@controllers/user"

export const userRouter = Router()

userRouter.get("/fetch", fetchAll)
userRouter.get("/id=:id/fetch", fetch)
userRouter.post("/create", create)