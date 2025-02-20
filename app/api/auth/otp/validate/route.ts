import { NextResponse } from 'next/server'
import { auth } from '@/src/lib/auth'
import prisma from '@/src/lib/prisma'

export async function POST(req: Request) {
  try {
    // 1) Récupérer l'OTP depuis le body JSON
    const { otp } = await req.json()
    if (!otp || typeof otp !== 'string') {
      return NextResponse.json(
        { message: 'OTP is required', success: false },
        { status: 400 }
      )
    }

    // 2) Vérifier la session (auth)
    const session = await auth()
    if (!session) {
      return NextResponse.json({
        message: 'Code expiré ou invalide.',
        success: false,
      })
    }

    // 3) Trouver le userOtp qui correspond à l'OTP soumis, créé il y a moins de 5 min
    const FIVE_MINUTES = 5 * 60_000
    const userOTP = await prisma.userOtp.findFirst({
      where: {
        userId: session.user.id,
        otp,
        purpose: 'REGISTRATION',
        createdAt: {
          gte: new Date(Date.now() - FIVE_MINUTES),
        },
      },
    })

    if (!userOTP) {
      return NextResponse.json({ message: 'OTP_INVALID', success: false })
    }

    // 4) Mettre à jour l'utilisateur (active = true)
    await prisma.user.update({
      where: { id: session.user.id },
      data: { active: true },
    })

    // 5) Supprimer l'OTP pour ne pas le réutiliser
    await prisma.userOtp.delete({
      where: {
        id: userOTP.id,
        otp,
        purpose: 'REGISTRATION',
      },
    })

    // 6) Réponse finale
    return NextResponse.redirect(req.url, 302)
  } catch (error) {
    console.error('Error validating OTP:', error)
    return NextResponse.json(
      { message: 'Internal server error', success: false },
      { status: 500 }
    )
  }
}
