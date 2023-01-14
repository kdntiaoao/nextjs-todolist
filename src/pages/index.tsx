import { NextPage } from 'next'
import Head from 'next/head'

import { Layout } from '@/components/templates/Layout'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>ToDo List</title>
      </Head>

      <Layout>Top Page</Layout>
    </>
  )
}

export default Home
