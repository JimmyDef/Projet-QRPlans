'use server'
import { auth } from '@/src/lib/auth'
import prisma from '@/src/lib/prisma'
import { generateUniqueFolderName } from '@/src/lib/helpers'
import { Folder, File } from '@/src/types/types'

export const createNewFolderAction = async (
  folderName: string,
  tempId: string
) => {
  const session = await auth()

  if (!session) {
    throw new Error('User not authenticated')
  }
  if (!session.user?.id) {
    throw new Error('User object is not defined in session')
  }
  if (!folderName) {
    throw new Error('Folder name is required')
  }
  const userId = session.user.id
  try {
    const baseName = folderName.trim()
    const similarFolders = await prisma.folder.findMany({
      where: {
        userId: userId,
        name: {
          startsWith: baseName,
        },
      },
      select: {
        name: true,
      },
    })

    const uniqueName = generateUniqueFolderName(baseName, similarFolders)

    const newFolder = await prisma.folder.create({
      data: {
        name: uniqueName,
        userId: userId,
      },
    })
    if (!newFolder) {
      throw new Error('Folder creation failed')
    }
    return { status: 'success', folder: newFolder, tempId }
  } catch (error) {
    console.error('Erreur lors de la création du dossier :', error)
    throw error
  }
}
