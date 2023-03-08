declare namespace NodeJS {
   export interface ProcessEnv {
      readonly NODE_ENV: "development" | "production"
      readonly PORT_NO: string | number
      readonly CLIENT_BASE_URL: string
      readonly SESSION_SECRET_KEY: string
      readonly DATABASE_URL: string
   }
}