'use server'
import { auth } from '@/src/lib/auth'
import { handleErrorResponseForActions } from '@/src/lib/customErrors'
import { generateUniqueFolderName } from '@/src/lib/helpers'
import prisma from '@/src/lib/prisma'

export const createFolderAction = async (
  folderName: string,
  tempId: string
) => {
  console.log('🚀 ~ folderName:', folderName.length)

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
  if (folderName.length > 18) {
    throw new Error('Folder name is too long')
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
      throw new Error('Folder creation failed.')
    }
    return { status: 'success', folder: newFolder, tempId }
  } catch (error) {
    handleErrorResponseForActions(error)
  }
}
