import { auth } from '@/src/lib/auth'
import { redirect } from 'next/navigation'
import { HomePage } from './HomePage'
import prisma from '@/src/lib/prisma'
import { HandleSessionRedirect } from '@/src/lib/SessionCheckerServer'

const Home = async () => {
  await HandleSessionRedirect()

  return <HomePage />
}

export default Home
