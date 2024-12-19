import prisma from '@/src/lib/prisma'
import bcrypt from 'bcrypt'
import { NextRequest, NextResponse } from 'next/server'
import { signIn } from '@/src/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const { password, passwordConfirmation, token } = await req.json()
    if (!password || !passwordConfirmation || !token) {
      return NextResponse.json(
        {
          error: 'Missing required fields',
        },
        {
          status: 400,
        }
      )
    }

    if (password !== passwordConfirmation) {
      return NextResponse.json(
        {
          error: 'Passwords do not match',
        },
        {
          status: 400,
        }
      )
    }

    const PasswordResetToken = await prisma.passwordResetToken.findFirst({
      where: {
        token,
        createdAt: {
          gt: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes
        },
      },
      include: {
        user: true,
      },
    })

    if (!PasswordResetToken) {
      return NextResponse.json(
        {
          error: 'Invalid or expired password reset token',
        },
        {
          status: 400,
        }
      )
    }

    const user = PasswordResetToken.user
    console.log('🚀 ~ user:', user)

    const hashedPassword = await bcrypt.hash(password, 10)
    await prisma.user.update({
      where: { id: PasswordResetToken.userId },
      data: { password: hashedPassword },
    })

    const deleteOldPassword = await prisma.passwordResetToken.delete({
      where: { token },
    })

    console.log('🚀 ~ deleteOldPassword:', deleteOldPassword)

    const signInResponse = await signIn('credentials', {
      redirect: false,
      email: user.email,
      password: password,
    })

    if (signInResponse?.error) {
      console.log('Sign in error:', signInResponse.error)
      return NextResponse.json(
        {
          error: 'Could not sign in after resetting password',
        },
        {
          status: 500,
        }
      )
    }

    return NextResponse.json(
      {
        message: 'Password reset successfully. You are now signed in.',
      },
      {
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error resetting password:', error)
    return NextResponse.json(
      {
        error: 'An error occurred while resetting the password',
      },
      {
        status: 500,
      }
    )
  }
}
