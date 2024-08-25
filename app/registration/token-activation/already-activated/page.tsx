import TokenResult from '@/components/token-result/page'

const ActivationAlreadyDone = async () => {
  return (
    <TokenResult
      title=" Email has been verified already!"
      url="/signIn"
      txt=" Your email has been verified in the past. You can now log in."
      buttonText="Go to login"
    />
  )
}

export default ActivationAlreadyDone
