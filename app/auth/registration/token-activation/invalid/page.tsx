import TokenResult from '@/src/components/token-result/TokenResult'
const ActivationFail = () => {
  return (
    <TokenResult
      title="Activation link invalid or expired."
      url="/token-result/resend-activation-link"
      txt="Please request a new one."
    />
  )
}
export default ActivationFail
