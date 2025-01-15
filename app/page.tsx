import { auth } from '@/src/lib/auth'
import { redirect } from 'next/navigation'
import { HomePage } from './HomePage'

const Home = async () => {
  const session = await auth()

  if (session) {
    session?.user.active === true
      ? redirect('/dashboard')
      : redirect('/auth/registration/validateEmailCode')
  }

  return <HomePage />
}

export default Home
