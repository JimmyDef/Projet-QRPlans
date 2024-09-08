import TokenResult from '@/src/components/token-result/TokenResult'
import { getSession } from '@/src/lib/getSession'
import { redirect } from 'next/navigation'
const ResetPasswordFail = async () => {
  const session = await getSession()

  if (session) {
    redirect('/dashboard')
  }
  return (
    <TokenResult
      title="Reset link invalid or expired."
      url="/auth/reset-password/send-email"
      txt="Please request a new one."
    />
  )
}
export default ResetPasswordFail
