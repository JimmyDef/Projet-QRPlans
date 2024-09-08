import { auth } from '@/src/lib/auth'
import { cache } from 'react'
const getSession = cache(auth)

export { getSession }
