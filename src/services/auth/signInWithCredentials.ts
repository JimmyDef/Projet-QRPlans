'use server'

import {
  AccountProviderError,
  EmailNotVerifiedError,
  InvalidPasswordError,
  MissingCredentialsError,
  UserNotFoundError,
} from '@/src/lib/customErrors'
import prisma from '@/src/lib/prisma'
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
} from '@prisma/client/runtime/library'
import bcrypt from 'bcrypt'

type Form = {
  email: string
  password: string
}

const signInWithCredentials = async ({ email, password }: Form) => {
  if (!email || !password) {
    throw new MissingCredentialsError('Email or password is missing')
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    })
    if (!user) {
      throw new UserNotFoundError("User doesn't exist.")
    }

    const userProvider = await prisma.account.findUnique({
      where: { userId: user.id },
    })
    if (userProvider) {
      throw new AccountProviderError(
        `Account was created with ${userProvider.provider} as provider, please use it.`
      )
    }

    const isPasswordValid =
      user.password && (await bcrypt.compare(password, user.password))
    if (!isPasswordValid) {
      throw new InvalidPasswordError('Invalid password')
    }

    return { status: 'success' }
  } catch (error) {
    if (
      error instanceof MissingCredentialsError ||
      error instanceof UserNotFoundError ||
      error instanceof AccountProviderError ||
      error instanceof EmailNotVerifiedError ||
      error instanceof InvalidPasswordError
    ) {
      throw error
    }
    if (
      error instanceof PrismaClientKnownRequestError ||
      error instanceof PrismaClientInitializationError
    ) {
      throw new Error('Database unavailable, try again later.')
    } else {
      throw new Error('An error occurred, please try again.')
    }
  }
}

export default signInWithCredentials
