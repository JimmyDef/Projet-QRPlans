'use server'
import { signIn } from '@/lib/auth'
import prisma from '@/lib/prisma'
import bcrypt from 'bcrypt'
import { capitalizeFirstLetter } from '@/services/helpers'
import { z } from 'zod'

export const credentialsSignIn = async (formData: FormData) => {
  const email = formData.get('email')
  const password = formData.get('password')

  if (!email || !password) {
    throw new Error('Email or password is missing')
  }

  await signIn('credentials', {
    email,
    password,
    redirectTo: '/dashboard',
  })
}

export const registration = async (formData: FormData) => {
  console.log('formData', formData)

  try {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string
    if (!email || !password || !firstName || !lastName) {
      throw new Error('Missing required fields')
    }

    const pwHash = bcrypt.hashSync(password, 10)

    const cleanedFirstname = capitalizeFirstLetter(firstName)
    const cleanedLastname = capitalizeFirstLetter(lastName)

    const user = await prisma.user.create({
      data: {
        email: email,
        password: pwHash,
        name: `${cleanedFirstname} ${cleanedLastname}`,
      },
    })
    return { message: 'success' }
  } catch (error) {
    console.error('Error:', error)
    return { message: 'error' }
  }
}
