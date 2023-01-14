import { NextPage } from 'next'
import Head from 'next/head'
import { Suspense } from 'react'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>ToDo List</title>
      </Head>
      <Suspense>
        <h1 className="text-lg font-bold text-red-400">Hello, Worild!</h1>
      </Suspense>
    </>
  )
}

export default Home
