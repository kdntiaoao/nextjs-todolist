import { useEffect, useState } from 'react'

import { Task } from 'types/task'
import { getAllTasksData } from 'utils/task'

export const useAllTasks = (accessToken: string) => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isDesc, setIsDesc] = useState(false)

  const reverseOrder = () => {
    setIsDesc((prev) => !prev)
  }

  useEffect(() => {
    const order = isDesc ? 'desc' : 'asc'
    getAllTasksData(accessToken, order).then((tasks) => {
      setTasks(tasks)
    })
  }, [accessToken, isDesc])

  return { tasks, isDesc, reverseOrder }
}
