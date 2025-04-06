import { updateFolderNameAction } from '@/app/actions/folders/updateFolderName.action'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { generateUniqueFolderName, sanitizeFoldersInput } from '../lib/helpers'
import { useDashboardStore } from '../lib/store'

export const useUpdateFolderName = () => {
  const [folderName, setFolderName] = useState('')
  const { folders, updateFolderName } = useDashboardStore((state) => ({
    folders: state.folders,
    updateFolderName: state.updateFolderName,
  }))

  const handleUpdateFolderName = async (folderId: string, newName: string) => {
    if (!folderId || !newName)
      throw new Error('Folder ID and new name are required.')

    const formattedNewName = newName.trim()
    if (formattedNewName.length === 0) return

    const currentFolder = folders.find((folder) => folder.id === folderId)

    if (!currentFolder) {
      toast.error('Error updating folder.')
      throw new Error(`Folder with ID ${folderId} not found`)
    }

    if (currentFolder.name === formattedNewName) return
    const uniqueFolderName = generateUniqueFolderName(formattedNewName, folders)
    try {
      updateFolderName(folderId, uniqueFolderName)

      await updateFolderNameAction(folderId, uniqueFolderName)
      // toast.success('Folder renamed successfully')
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error updating folder.'
      updateFolderName(folderId, currentFolder?.name)
      toast.error(errorMessage)
      console.error('Error updating folderName:', error)
    }
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedInput = sanitizeFoldersInput(e.target.value)
    setFolderName(sanitizedInput)
  }

  return {
    handleUpdateFolderName,
    folderName,
    setFolderName,
    handleOnChange,
  }
}
