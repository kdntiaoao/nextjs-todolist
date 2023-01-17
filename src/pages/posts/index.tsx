import { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import { useCallback } from 'react'

import { ArrowDownRightIcon, ArrowUpRightIcon } from '@heroicons/react/24/solid'

import { Layout } from '@/components/templates/Layout'
import { useAllPosts } from '@/hooks/useAllPosts'
import { Post } from 'types/post'
import { getAllPostsData } from 'utils/post'

type Props = {
  posts: Post[]
}

const PostsPage: NextPage<Props> = ({ posts: initialPosts }: Props) => {
  const { posts, isDesc, reverseOrder } = useAllPosts(initialPosts)

  const changePostsOrder = useCallback(() => {}, [])

  return (
    <Layout>
      <div className="mx-auto max-w-5xl py-10 px-4">
        <h2 className="text-2xl font-bold">投稿一覧</h2>
        <div className="mt-10">
          <button
            type="button"
            className="mx-auto flex h-11 items-center justify-center gap-2 rounded bg-gray-500 px-4 text-white shadow-sm transition [@media(any-hover:hover){&:hover}]:shadow-lg"
            onClick={reverseOrder}
          >
            {isDesc ? (
              <>
                <ArrowDownRightIcon className="h-5 w-5" />
                降順
              </>
            ) : (
              <>
                <ArrowUpRightIcon className="h-5 w-5" />
                昇順
              </>
            )}
          </button>
          <div className="mt-8">
            <ul className="grid gap-4">
              {posts.length > 0 &&
                posts.map((post) => (
                  <li key={post.id}>
                    <Link
                      href={`/posts/${post.id}`}
                      className="block rounded bg-white px-4 py-3 shadow-sm transition duration-300 [@media(any-hover:hover){&:hover}]:scale-[1.02] [@media(any-hover:hover){&:hover}]:shadow-md"
                    >
                      {post.id}. {post.title} ---- {post.created_at}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPostsData()
  return {
    props: { posts },
    revalidate: 5,
  }
}

export default PostsPage
