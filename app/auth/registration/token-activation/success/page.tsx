import TokenResult from '@/src/components/token-result/TokenResult'

const ActivationSuccess = async () => {
  return (
    <TokenResult
      title="Email verified!"
      url="/dashboard"
      txt="Your email has been verified. You are now logged in."
      buttonText="Go to dashboard"
    />
  )
}

export default ActivationSuccess
