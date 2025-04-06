'use server'
import TokenResult from '@/src/components/token-result/TokenResult'
import { checkAuthAndRedirect } from '@/src/lib/authRedirectGuard'
const ResetPasswordFail = async () => {
  await checkAuthAndRedirect()

  return (
    <TokenResult
      title="Reset link invalid or expired."
      url="/auth/reset-password"
      txt="Please request a new one."
    />
  )
}
export default ResetPasswordFail
