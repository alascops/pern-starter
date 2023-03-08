import express, { json, static as _static, urlencoded, type Application } from "express"
import { config } from "dotenv"
import { join } from "path"
import { corsMiddleware } from "@middlewares/cors"
import { errorMiddleware } from "@middlewares/error"
import { loggerMiddleware } from "@middlewares/logger"
import { sessionMiddleware } from "@middlewares/session"
import { authRouter } from "@routers/auth"
import { userRouter } from "@routers/user"
import { favoriteRouter } from "@routers/favorite"

config()

const app: Application = express()

if (process.env.NODE_ENV === "production") {
   app.set("trust proxy", 1)
}

if (process.env.NODE_ENV === "development") {
   app.use(loggerMiddleware)
}

app.use(sessionMiddleware)

app.use(json())

app.use(urlencoded({
   extended: true
}))

app.use(_static(join(__dirname, "public")))

app.use(corsMiddleware)

app.use("/api/auth", authRouter)
app.use("/api/users", userRouter)
app.use("/api/favorites", favoriteRouter)

app.use(errorMiddleware)

app.listen(process.env.PORT_NO || 5000)