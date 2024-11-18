'use server'
import { auth } from '@/src/lib/auth'
import prisma from '@/src/lib/prisma'

export const updateFolderNameAction = async (
  folderId: string,
  name: string
) => {
  const session = await auth()

  if (!session || !session.user?.id) {
    throw new Error('User not authenticated')
  }

  if (!folderId) {
    throw new Error('Folder id is required')
  }
  const userId = session.user.id

  try {
    const folder = await prisma.folder.findUnique({
      where: { id: folderId },
    })

    if (!folder) {
      throw new Error('Folder not found.')
    }

    if (folder.userId !== userId) {
      throw new Error('You do not have permission to rename this folder.')
    }
    const folderUpdated = await prisma.folder.update({
      where: {
        id: folderId,
      },
      data: {
        name: name,
      },
    })
    if (!folderUpdated) {
      throw new Error('Folder not renamed')
    }

    return { status: 'success', folder: folderUpdated }
  } catch (error) {
    console.error('Erreur modification du dossier :', error)
    throw error
  }
}
