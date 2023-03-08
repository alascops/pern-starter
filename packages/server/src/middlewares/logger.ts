import morgan from "morgan"

export const loggerMiddleware = morgan("Request: { method: <:method>, endpoint: :url, status: :status, response-time: :response-time[2] ms }")