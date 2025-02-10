'use client'

import { AppError } from '@/src/components/layout/app-error/App-error'

const GlobalError = ({ error, reset }: { error: Error; reset: () => void }) => {
  return <AppError error={error.message} />
}

export default GlobalError
