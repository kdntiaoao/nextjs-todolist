import { Task } from 'types/task'

export const getAllTasksData = async (accessToken: string, order: 'asc' | 'desc' = 'asc') => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/tasks?order=${order}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${accessToken}`,
    },
  })
  const tasks: Task[] = await res.json()
  return tasks
}

export const getAllTaskIds = async (accessToken: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/tasks`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${accessToken}`,
    },
  })
  const tasks: Task[] = await res.json()
  const taskIds = tasks.map((post) => post.id.toString())
  return taskIds
}
