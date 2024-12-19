'use client'
import TokenResult from '@/src/components/token-result/TokenResult'

const PasswordModified = () => {
  return (
    <TokenResult
      title="Password modified!"
      url="/dashboard"
      txt="Your password has been modified. You are now logged in."
      buttonText="Go to dashboard"
    />
  )
}

export default PasswordModified
