import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { signIn } from '@/lib/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  const { token } = params

  try {
    console.log(`Received token: ${token}`)
    const activateToken = await prisma.activateToken.findUnique({
      where: {
        token,
        createdAt: {
          gt: new Date(Date.now() - 5 * 60 * 60 * 1000),
        },
      },
      include: {
        user: true,
      },
    })

    if (!activateToken) {
      return NextResponse.redirect(
        new URL('/token-activation/invalid', request.url)
      )
    }

    const user = activateToken.user

    if (user.active) {
      return NextResponse.redirect(
        new URL('/token-activation/already-activated', request.url)
      )
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        active: true,
      },
    })

    await prisma.activateToken.update({
      where: {
        token,
        activatedAt: null,
      },
      data: {
        activatedAt: new Date(),
      },
    })

    const signInResponse = await signIn('credentials', {
      redirect: false,
      email: user.email,
    })

    if (signInResponse?.error) {
      console.log('Sign in error:', signInResponse.error)
      return NextResponse.json(
        { message: 'Could not sign in' },
        { status: 500 }
      )
    }
    return NextResponse.redirect(
      new URL('/token-activation/success', request.url)
    )
  } catch (error) {
    console.error('Error activating user:', error)
    return NextResponse.json(
      { message: 'Could not activate user' },
      { status: 500 }
    )
  }
}
