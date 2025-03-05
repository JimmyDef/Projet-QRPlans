import { auth } from '@/src/lib/auth'
import { redirect } from 'next/navigation'
import { HomePage } from './HomePage'
import prisma from '@/src/lib/prisma'
import { checkAuthAndRedirect } from '@/src/lib/authRedirectGuard'

const Home = async () => {
  await checkAuthAndRedirect()

  return <HomePage />
}

export default Home
