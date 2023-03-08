import cors, { type CorsOptions } from "cors"
import { config } from "dotenv"

config()

const corsOptions: CorsOptions = {
   credentials: true,
   optionsSuccessStatus: 200,
   origin: process.env.CLIENT_BASE_URL
}

export const corsMiddleware = cors(corsOptions)