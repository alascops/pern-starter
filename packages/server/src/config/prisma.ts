import { type Store } from "express-session"
import { PrismaClient } from "@prisma/client"
import { PrismaSessionStore } from "@quixo3/prisma-session-store"

export const prisma = new PrismaClient()

export const store: Store = new PrismaSessionStore(prisma, {
   checkPeriod: 3 * 60 * 1000,
   dbRecordIdFunction: undefined,
   dbRecordIdIsSessionId: true,
   ttl: 24 * 60 * 60 * 1000
})