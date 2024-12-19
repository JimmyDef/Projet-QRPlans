import TokenResult from '@/src/components/token-result/TokenResult'
const ActivationFail = () => {
  return (
    <TokenResult
      title="Activation link invalid or expired."
      url="/auth/registration/token-activation/resend-activation-link"
      txt="Please request a new one."
    />
  )
}
export default ActivationFail
