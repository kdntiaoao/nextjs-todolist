import { useEffect, useState } from 'react'

import { Post } from 'types/post'
import { getAllPostsData } from 'utils/post'

export const useAllPosts = (initialPosts: Post[] = []) => {
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [isDesc, setIsDesc] = useState(false)

  const reverseOrder = () => {
    setIsDesc((prev) => !prev)
  }

  useEffect(() => {
    const order = isDesc ? 'desc' : 'asc'
    getAllPostsData(order).then((posts) => {
      setPosts(posts)
    })
  }, [isDesc])

  return { posts, isDesc, reverseOrder }
}
