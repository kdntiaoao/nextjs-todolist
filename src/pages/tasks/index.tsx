import { NextPage } from 'next'

import { ArrowDownRightIcon, ArrowUpRightIcon } from '@heroicons/react/24/solid'
import { useCookies } from 'react-cookie'

import { Layout } from '@/components/templates/Layout'
import { useAllTasks } from '@/hooks/useAllTasks'

const TasksPage: NextPage = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken'])
  const { tasks, isDesc, reverseOrder } = useAllTasks(cookies.accessToken)

  return (
    <Layout>
      <div className="mx-auto max-w-5xl py-10 px-4">
        <h2 className="text-2xl font-bold">タスク一覧</h2>
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
              {tasks.length > 0 ? (
                tasks.map((post) => (
                  <li key={post.id} className="block rounded bg-white px-4 py-3 shadow-sm">
                    {post.id}. {post.title}
                    <p>投稿者：{post.user}</p>
                    <p>投稿日：{post.created_at}</p>
                    <p>更新日：{post.updated_at}</p>
                  </li>
                ))
              ) : (
                <p>タスクがありません。</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default TasksPage
