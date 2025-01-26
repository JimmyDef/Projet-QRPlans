import { auth } from '@/src/lib/auth'
import { redirect } from 'next/navigation'
import { HomePage } from './HomePage'

const Home = async () => {
  const session = await auth()

  if (session) {
    session?.user.active === false && session?.user.provider === 'credentials'
      ? redirect('/dashboard')
      : redirect('/auth/registration/validateEmailOTP')
  }

  return <HomePage />
}

export default Home
