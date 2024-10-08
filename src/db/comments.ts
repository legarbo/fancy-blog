import { unstable_cache } from "next/cache"
import prisma from "./db"
import { cache } from "react"

export const getPostComments = unstable_cache(
  cache(async (postId: string) => {
    return await prisma.comment.findMany({ where: { postId: postId } })
  }),
  ["comments", "postId"]
)
