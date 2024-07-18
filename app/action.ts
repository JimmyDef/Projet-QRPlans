'use server'
import { signIn } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { saltAndHashPassword } from '@/services/helpers'
export const credentialsSignIn = async (formData: FormData) => {
  console.log('formData', formData)
  await signIn('credentials', formData)
}
export const credentialsSignUp = async (formData: FormData) => {
  console.log('formData', formData)

  try {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string
    if (!email || !password || !firstName || !lastName) {
      throw new Error('Missing required fields')
    }
    const pwHash = saltAndHashPassword(password)
    const user = await prisma.user.create({
      data: {
        email: email,
        password: pwHash,
        name: `${firstName} ${lastName}`,
      },
    })
    return user
  } catch (error) {
    console.error('Error:', error)
    return
  }
}
