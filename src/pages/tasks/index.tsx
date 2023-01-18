import { NextPage } from 'next'
import { useCallback } from 'react'

import { ArrowDownRightIcon, ArrowUpRightIcon, XCircleIcon } from '@heroicons/react/24/solid'
import { useCookies } from 'react-cookie'

import { Layout } from '@/components/templates/Layout'
import { useAllTasks } from '@/hooks/useAllTasks'

const TasksPage: NextPage = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken', 'refreshToken'])
  const { tasks, isDesc, reverseOrder, refreshTasks } = useAllTasks(cookies.accessToken)

  const deleteTask = async (id: number | string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/tasks/${id.toString()}`, {
      method: 'DELETE',
      headers: {
        Authorization: `JWT ${cookies.accessToken}`,
        'Content-Type': 'application/json',
      },
    })
    refreshTasks()
  }

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
                  <li key={post.id} className="flex items-center justify-between rounded bg-white px-4 py-3 shadow-sm">
                    <div className="flex-1">
                      <p>
                        {post.id}. {post.title}
                      </p>
                      <p>投稿者：{post.user}</p>
                      <p>投稿日：{post.created_at}</p>
                      <p>更新日：{post.updated_at}</p>
                    </div>
                    <button type="button" onClick={() => deleteTask(post.id)}>
                      <XCircleIcon className="h-11 w-11 text-gray-400" />
                    </button>
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
