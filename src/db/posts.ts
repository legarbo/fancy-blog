import { Prisma } from "@prisma/client"
import prisma from "./db"
import { unstable_cache } from "next/cache"
import { cache } from "react"

export const getPosts = async ({
  query,
  userId,
}: {
  query?: string
  userId?: string
} = {}) => {
  const where: Prisma.PostFindManyArgs["where"] = {}
  if (query) {
    where.OR = [{ title: { contains: query } }, { body: { contains: query } }]
  }

  if (userId) {
    where.userId = userId
  }

  return await prisma.post.findMany({ where })
}

export const getPost = unstable_cache(
  cache(async (postId: string) => {
    return await prisma.post.findUnique({ where: { id: postId } })
  }),
  ["posts", "postId"]
)

export const getUserPosts = unstable_cache(
  cache(async (userId: string) => {
    return await prisma.post.findMany({ where: { userId: userId } })
  }),
  ["posts", "userId"]
)

export async function createPost({
  title,
  body,
  userId,
}: {
  title: string
  body: string
  userId: string
}) {
  return await prisma.post.create({
    data: {
      title,
      body,
      userId,
    },
  })
}

export async function updatePost(
  postId: string,
  {
    title,
    body,
    userId,
  }: {
    title: string
    body: string
    userId: string
  }
) {
  return await prisma.post.update({
    where: { id: postId },
    data: {
      title,
      body,
      userId,
    },
  })
}

export async function deletePost(postId: string) {
  return await prisma.post.delete({ where: { id: postId } })
}
