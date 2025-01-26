import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface User {
    active: boolean
    provider: string
  }

  interface Session {
    user: User & DefaultSession['user']
  }
}
