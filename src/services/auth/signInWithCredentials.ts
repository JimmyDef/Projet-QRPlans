'use server'

import { AppError, handleErrorResponseForActions } from '@/src/lib/customErrors'
import prisma from '@/src/lib/prisma'
import bcrypt from 'bcrypt'

type Form = {
  email: string
  password: string
}

const signInWithCredentials = async ({ email, password }: Form) => {
  if (!email || !password) {
    throw new AppError('Email or password is missing')
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    })
    if (!user) {
      throw new AppError("User doesn't exist.")
    }

    const userProvider = await prisma.account.findUnique({
      where: { userId: user.id },
    })
    if (userProvider) {
      throw new AppError(
        `Account was created with ${userProvider.provider} as provider, please use it.`
      )
    }

    const isPasswordValid =
      user.password && (await bcrypt.compare(password, user.password))
    if (!isPasswordValid) {
      throw new AppError('Invalid password')
    }

    return { status: 'success' }
  } catch (error) {
    handleErrorResponseForActions(error)
  }
}

export default signInWithCredentials
