import prisma from '@/src/lib/prisma'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { name } = await req.json()

    if (!name) {
      return NextResponse.json(
        { error: 'Le nom du dossier est requis' },
        { status: 400 }
      )
    }

    // Ajouter le dossier dans la base de données
    const folder = await prisma.folder.create({
      data: {
        name,
        userId: 'some-user-id', // Récupérer l'ID de l'utilisateur connecté via la session
      },
    })

    return NextResponse.json(folder)
  } catch (error) {
    console.error('Erreur lors de la création du dossier:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la création du dossier' },
      { status: 500 }
    )
  }
}
