'use server'
import { auth } from '@/src/lib/auth'
import { AppError, handleErrorResponseForActions } from '@/src/lib/customErrors'
import prisma from '@/src/lib/prisma'

export const updateFolderNameAction = async (
  folderId: string,
  newName: string
) => {
  try {
    const session = await auth()
    // throw new AppError('User not authenticated')
    if (!session || !session.user?.id) {
      throw new Error('User not authenticated')
    }
    if (newName.length > 23) {
      throw new Error('Folder name is too long')
    }

    if (!folderId) {
      throw new Error('Folder id is required')
    }

    const userId = session.user.id
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
        name: newName,
      },
    })
    if (!folderUpdated) {
      throw new Error('Folder not renamed.')
    }

    return { status: 'success', folder: folderUpdated }
  } catch (error) {
    console.error('Error updating fodler name:', error)
    handleErrorResponseForActions(error, "Error updating folder's newName.")
  }
}
