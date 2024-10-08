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
  cache(async (userId: string) => {
    return await prisma.todo.findMany({ where: { userId: userId } })
  }),
  ["todos", "userId"]
)
