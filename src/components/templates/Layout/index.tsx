import Head from 'next/head'
import { memo, ReactNode } from 'react'

import { HeaderContainer } from '@/components/organisms/containers/HeaderContainer'
import { useHasMounted } from '@/hooks/useHasMounted'

type Props = {
  title?: string
  description?: string
  children: ReactNode
}

export const Layout = memo(function Layout({
  title = 'ToDo List',
  description = 'タスクを整理しましょう！',
  children,
}: Props) {
  const hasMounted = useHasMounted()

  if (!hasMounted) {
    return <></>
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <div className="grid min-h-screen grid-cols-[100%] grid-rows-[auto_1fr_auto]">
        <HeaderContainer />
        <main>{children}</main>
        <footer className="h-8 min-h-fit">
          <p className="text-center text-sm text-gray-600">&copy; ToDo List</p>
        </footer>
      </div>
    </>
  )
})
