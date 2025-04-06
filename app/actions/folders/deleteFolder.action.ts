'use server'
import { auth } from '@/src/lib/auth'
import { handleErrorResponseForActions } from '@/src/lib/customErrors'
import prisma from '@/src/lib/prisma'

export const deleteFolderAction = async (folderId: string) => {
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
      where: {
        id: folderId,
      },
    })
    if (!folder) {
      throw new Error('Folder not found ')
    }
    if (folder.userId !== userId) {
      throw new Error('You do not have permission to delete this folder.')
    }
    await prisma.folder.delete({
      where: { id: folderId },
    })
    return { status: 'success' }
  } catch (error) {
    console.error('Error deleting folder :', error)
    handleErrorResponseForActions(error, 'Error deleting folder.')
  }
}
