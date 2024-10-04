import { unstable_cache } from "next/cache"
import prisma from "./db"
import { cache } from "react"

export const getTodos = unstable_cache(
  cache(async () => {
    return await prisma.todo.findMany()
  }),
  ["todos"]
)

export const getUserTodos = unstable_cache(
  cache(async (userId: string | number) => {
    return await prisma.todo.findMany({ where: { userId: Number(userId) } })
  }),
  ["todos", "userId"]
)
