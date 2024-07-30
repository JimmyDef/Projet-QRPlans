import prisma from '@/lib/prisma'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import bcrypt from 'bcrypt'
import { capitalizeFirstLetter } from '@/services/helpers'
import { NextResponse } from 'next/server'
export async function POST(req: Request) {
  try {
    const { email, password, firstName, lastName } = await req.json()
    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json({
        error: 'Missing required fields',
        status: 400,
      })
    }
    const pwHash = bcrypt.hashSync(password, 10)
    const cleanedFirstname = capitalizeFirstLetter(firstName)
    const cleanedLastname = capitalizeFirstLetter(lastName)

    const user = await prisma.user.create({
      data: {
        email,
        password: pwHash,
        name: `${cleanedFirstname} ${cleanedLastname}`,
      },
    })

    return NextResponse.json({ user, status: 201 })
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        // Code P2002 indique une violation de la contrainte unique
        return NextResponse.json({ error: 'Email already exists', status: 409 })
      }
      return NextResponse.json({ error, status: 500 })
    }
  }
}
