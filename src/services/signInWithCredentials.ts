'use server'

import { signIn } from '@/src/lib/auth'
import prisma from '@/src/lib/prisma'
import bcrypt from 'bcrypt'

import { credentialsSchema } from '@/src/lib/zod'

type Form = {
  email: string
  password: string
}

const signInWithCredentials = async ({ email, password }: Form) => {
  if (!email || !password) {
    throw new Error('Email or password is missing')
  }

  try {
    const parsedData = await credentialsSchema.parseAsync({ email })

    const user = await prisma.user.findUnique({
      where: { email: parsedData.email },
    })
    if (!user) {
      throw new Error("User doesn't exist.")
    }
    const userProvider = await prisma.account.findUnique({
      where: { userId: user.id },
    })
    if (userProvider) {
      throw new Error(
        `Account were created with ${userProvider.provider} as provider, please use it.`
      )
    }
    if (user.active === false) {
      throw new Error('Email is not verified.')
    }
    const isPasswordValid =
      user.password && (await bcrypt.compare(password, user.password))
    if (!isPasswordValid) {
      throw new Error('Invalid password')
    }

    // await signIn('credentials', {
    //   redirectTo: '/dashboard',
    //   email: parsedData.email,
    //   password: password,
    // })
    return { status: 'success' }
  } catch (error) {
    console.log('Error:', error)
    // throw new Error('test')
    throw error
  }
}
export default signInWithCredentials
