import { unstable_cache } from "next/cache"
import prisma from "./db"
import { cache } from "react"

export const getUsers = unstable_cache(
  cache(async () => {
    return await prisma.user.findMany()
  }),
  ["users"],
  { revalidate: 60 }
)

export const getUser = unstable_cache(
  cache(async (userId: string) => {
    return await prisma.user.findUnique({ where: { id: userId } })
  }),
  ["user", "userId"]
)
