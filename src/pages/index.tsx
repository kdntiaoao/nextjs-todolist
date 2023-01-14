import { NextPage } from 'next'
import Head from 'next/head'

import { AuthForm } from '@/components/molcules/AuthForm'
import { Layout } from '@/components/templates/Layout'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>ToDo List</title>
      </Head>

      <Layout>
        <AuthForm />
      </Layout>
    </>
  )
}

export default Home
