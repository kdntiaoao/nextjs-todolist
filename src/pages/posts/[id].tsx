import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { ArrowLeftIcon } from '@heroicons/react/24/solid'

import { Layout } from '@/components/templates/Layout'
import { Post } from 'types/post'
import { getAllPostIds, getPostData } from 'utils/post'

type Props = {
  post: Post | null
}

const PostPage: NextPage<Props> = ({ post }: Props) => {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <Layout>
      <div className="mx-auto max-w-5xl py-10 px-4">
        <Link href="/posts" className="flex items-center gap-2 text-blue-600">
          <ArrowLeftIcon className="h-5 w-5" />
          投稿一覧
        </Link>
        <div className="mt-8">
          {post ? (
            <>
              <h2 className="text-2xl font-bold">{post.title}</h2>
              <div className="grid justify-end">
                <div>投稿者：{post.author}</div>
                <div>投稿日：{post.created_at}</div>
              </div>
              <p className="mt-4">{post.content}</p>
            </>
          ) : (
            <p>投稿がありません。</p>
          )}
        </div>
      </div>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const postIds = await getAllPostIds()
  const paths = postIds.map((id) => ({ params: { id } }))
  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<{ post: Post | null }, { id: string }> = async ({ params }) => {
  if (!params) {
    return { props: { post: null } }
  }
  const post = await getPostData(params.id)
  return {
    props: { post },
    revalidate: 5,
  }
}

export default PostPage
