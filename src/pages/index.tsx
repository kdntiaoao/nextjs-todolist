import { NextPage } from 'next'
import Head from 'next/head'
import { Suspense } from 'react'

import { Layout } from '@/components/templates/Layout'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>ToDo List</title>
      </Head>

      <Layout>
        <Suspense>
          <h1 className="text-lg font-bold text-red-400">Hello, Worild!</h1>
        </Suspense>
      </Layout>
    </>
  )
}

export default Home
