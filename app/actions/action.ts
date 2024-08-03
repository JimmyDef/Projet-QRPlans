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

export const credentialsSignIn = async ({ email, password }: Form) => {
  if (!email || !password) {
    throw new Error('Email or password is missing')
  }

  try {
    const parsedData = await credentialsSchema.parseAsync({ email })

    console.log('🚀 ~ parsedData:', parsedData)

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
      password: password,
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

// export const registration = async (formData: FormData) => {
//   console.log('formData', formData)

//   try {
//     const email = formData.get('email') as string
//     const password = formData.get('password') as string
//     const firstName = formData.get('firstName') as string
//     const lastName = formData.get('lastName') as string
//     if (!email || !password || !firstName || !lastName) {
//       throw new Error('Missing required fields')
//     }

//     const pwHash = bcrypt.hashSync(password, 10)

//     const cleanedFirstname = capitalizeFirstLetter(firstName)
//     const cleanedLastname = capitalizeFirstLetter(lastName)

//     const user = await prisma.user.create({
//       data: {
//         email: email,
//         password: pwHash,
//         name: `${cleanedFirstname} ${cleanedLastname}`,
//       },
//     })
//     revalidatePath('/')
//     await new Promise((resolve) => setTimeout(resolve, 1000))
//     console.log('formData', formData)
//     return 'success'
//   } catch (error) {
//     console.error('Error:', error)
//     return 'error'
//   }
// }
