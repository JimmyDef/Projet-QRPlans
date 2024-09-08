import TokenResult from '@/src/components/token-result/TokenResult'

const ActivationAlreadyDone = async () => {
  return (
    <TokenResult
      title=" Email has been verified already!"
      url="/auth/sign-in"
      txt=" Your email has been verified in the past. You can now log in."
      buttonText="Go to login"
    />
  )
}

export default ActivationAlreadyDone
