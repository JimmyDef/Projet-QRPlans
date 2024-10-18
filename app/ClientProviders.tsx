'use client'

import { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'

interface ProvidersProps {
  children: ReactNode
}

export default function ClientProviders({ children }: ProvidersProps) {
  return <SessionProvider>{children}</SessionProvider>
}
