import { auth } from '@/src/lib/auth'
import { redirect } from 'next/navigation'
import { HomePage } from './HomePage'

const Home = async () => {
  const session = await auth()

  if (session) redirect('/dashboard')

  return <HomePage />
}

export default Home
