import { User } from '@/src/lib/types'
const verifySession = async (): Promise<User | null> => {
  try {
    const res: Response = await fetch('/api/auth/session')
    const session: User | { error: string } = await res.json()

    if ('error' in session) {
      return null
    }
    return session
  } catch (error) {
    console.error('Error fetching session:', error)
    return null
  }
}

export default verifySession
