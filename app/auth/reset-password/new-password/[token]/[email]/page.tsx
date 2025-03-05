'use server'
import NewPasswordForm from '@/src/components/ui/form/NewPasswordForm'
import { redirect } from 'next/navigation'
import prisma from '@/src/lib/prisma'

const RequestResetPasswordEmail = async ({
  params,
}: {
  params: { token: string; email: string }
}) => {
  const { token, email } = await params
  const resetPasswordToken = await prisma.passwordResetToken.findUnique({
    where: {
      token: token,
    },
  })

  if (!resetPasswordToken || resetPasswordToken.expiresAt < new Date()) {
    redirect('/auth/reset-password/request-result/invalid')
  }

  return <NewPasswordForm email={decodeURIComponent(email)} token={token} />
}
export default RequestResetPasswordEmail
