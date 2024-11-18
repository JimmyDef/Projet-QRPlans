'use server'
import { auth } from '@/src/lib/auth'
import prisma from '@/src/lib/prisma'

export const removeFolderAction = async (folderId: string) => {
  const session = await auth()
  console.log('🚀 ~ session:', session)

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
    console.error('Erreur lors de la suppression du dossier :', error)
    throw error
  }
}
