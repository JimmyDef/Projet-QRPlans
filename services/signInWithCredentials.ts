'use server'
// import { revalidatePath } from 'next/cache'
import { signIn } from '@/lib/auth'
import prisma from '@/lib/prisma'
import bcrypt from 'bcrypt'

import { credentialsSchema } from '@/lib/zod'
import { ZodError } from 'zod'
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
      throw new Error("User doesn't exist")
    }

    const isPasswordValid =
      user.password && (await bcrypt.compare(password, user.password))
    if (!isPasswordValid) {
      throw new Error('Invalid password')
    }

    await signIn('credentials', {
      email: parsedData.email,
      redirectTo: '/dashboard',
    })
  } catch (error) {
    if (error instanceof ZodError) {
      console.log('ZodError:', error)
      // Transform the ZodError to a human-readable message
      // const formattedError = error.errors.map((e) => e.message).join(', ')
      throw new Error('Invalid email')
    }
    throw error
  }
}
export default signInWithCredentials
