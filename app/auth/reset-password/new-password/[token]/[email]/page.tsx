'use server'
import NewPasswordForm from '@/src/components/ui/form/NewPasswordForm'
import prisma from '@/src/lib/prisma'
import { redirect } from 'next/navigation'

const RequestResetPasswordEmail = async ({
  params,
}: {
  params: { token: string; email: string }
}) => {
  const { token, email } = await params
  try {
    const resetPasswordToken = await prisma.passwordResetToken.findUnique({
      where: {
        token: token,
      },
    })

    if (!resetPasswordToken || resetPasswordToken.expiresAt < new Date()) {
      redirect('/auth/reset-password/request-result/invalid')
    }
    return <NewPasswordForm email={decodeURIComponent(email)} token={token} />
  } catch (error) {
    throw error
  }
}
export default RequestResetPasswordEmail
