import TokenResult from '@/src/components/token-result/TokenResult'
const ResetPasswordFail = async () => {
  return (
    <TokenResult
      title="Reset link invalid or expired."
      url="/auth/reset-password/send-email"
      txt="Please request a new one."
    />
  )
}
export default ResetPasswordFail
