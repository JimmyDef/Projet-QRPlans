'use client'

import { AppError } from '@/src/components/layout/app-error/App-error'
import { useSearchParams } from 'next/navigation'

const AuthErrorPage = () => {
  const searchParams = useSearchParams()
  const error = searchParams.get('error') ?? undefined

  return <AppError error={error} />
}
export default AuthErrorPage
