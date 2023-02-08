import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import TestComponent from './TestComp'
import Album from './Album'

export default function Home() {
  return (
    <>
      <Head>
       
      </Head>
      <main>
        <TestComponent />
        <Album />
      </main>
    </>
  )
}
