'use client'

import { AppError } from '@/src/components/app-error/App-error'
import { useEffect } from 'react'

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) => {
  useEffect(() => {
    console.error(error)
  }, [error])

  return <AppError error={error.message} />
}
export default Error
