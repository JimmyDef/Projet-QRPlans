'use server'
import { auth } from '@/src/lib/auth'
import prisma from '@/src/lib/prisma'
import { Folder, File } from '@/src/types/types'

export const createNewFolder = async (folderName: string) => {
  const session = await auth()
  console.log('🚀 ~ session:', session)

  if (!session) {
    throw new Error('User not authenticated')
  }
  if (!session.user?.id) {
    throw new Error('User object is not defined in session')
  }
  const userId = session.user.id

  const newFolder = await prisma.folder.create({
    data: { userId: userId, name: folderName },
  })
  if (!newFolder) {
    throw new Error('Folder creation failed')
  }
  return { status: 'success' }
}
