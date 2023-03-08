import { PrismaClient } from "@prisma/client"
import { genSalt, hash } from "bcrypt"

const prisma = new PrismaClient()

async function seed() {
   await prisma.user.upsert({
      where: {
         username: "superuser"
      },
      update: {},
      create: {
         username: "superuser",
         emailAddress: "superuser@superuser.com",
         password: await hash("superuser", await genSalt())
      }
   })
}

seed().catch((err) => {
   console.error(err)
   
   process.exit(1)
}).finally(async () => {
   await prisma.$disconnect()
})