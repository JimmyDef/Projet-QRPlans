import { useState } from 'react'
import { generateUniqueFolderName, sanitizeFoldersInput } from '../lib/helpers'
import { useDashboardStore } from '../lib/store'
import { shallow } from 'zustand/shallow'
import { createFolderAction } from '@/app/actions/folders/createFolder.action'
import { toast } from 'react-toastify'

export const useCreateFolder = () => {
  const [newFolder, setNewFolder] = useState('')
  const { folders, addFolder, updateFolderId, removeFolder } =
    useDashboardStore((state) => ({
      folders: state.folders,
      addFolder: state.addFolder,
      updateFolderId: state.updateFolderId,
      removeFolder: state.removeFolder,
    }))

  const handleAddNewFolder = async () => {
    const trimmedFolder = newFolder.trim()
    if (trimmedFolder.length === 0) return
    const tempId = crypto.randomUUID()

    const uniqueFolderName = generateUniqueFolderName(trimmedFolder, folders)
    addFolder({
      id: tempId,
      name: uniqueFolderName,
      files: [],
      isTemporary: true,
    })
    setNewFolder('')
    try {
      const res = await createFolderAction(trimmedFolder, tempId)
      if (res && res.folder) {
        updateFolderId(tempId, res.folder.id)
      }
      // toast.success('Dossier créé avec succès')
    } catch (error) {
      removeFolder(tempId)
      toast.error('Error creating folder:')
      console.error('Error creating folder:', error)
    }
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedInput = sanitizeFoldersInput(e.target.value)
    setNewFolder(sanitizedInput)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape' && newFolder.length > 0) {
      setNewFolder('')
    }
    if (e.key === 'Enter') {
      handleAddNewFolder()
    }
    if (e.key === 'Tab') {
      setNewFolder('')
    }
  }
  return {
    handleAddNewFolder,
    newFolder,
    setNewFolder,
    handleOnChange,
    handleKeyPress,
  }
}
