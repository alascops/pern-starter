import { Router } from "express"
import { fetchUserFavorites } from "@controllers/favorite"

export const favoriteRouter = Router()

favoriteRouter.get("/user-id=:id/fetch", fetchUserFavorites)