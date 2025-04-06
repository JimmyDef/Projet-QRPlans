import { checkAuthAndRedirect } from '@/src/lib/authRedirectGuard'
import { HomePage } from './HomePage'

const Home = async () => {
  await checkAuthAndRedirect()

  return <HomePage />
}

export default Home
