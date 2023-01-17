import { Post } from 'types/post'

export const getAllPostsData = async (order: 'asc' | 'desc' = 'asc') => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/posts?order=${order}`)
  const posts: Post[] = await res.json()
  return posts
}

export const getAllPostIds = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/posts`)
  const posts: Post[] = await res.json()
  const postIds = posts.map((post) => post.id.toString())
  return postIds
}

export const getPostData = async (postId: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/posts/${postId}`)
  const post: Post = await res.json()
  if (!post?.title) {
    return null
  }
  return post
}
