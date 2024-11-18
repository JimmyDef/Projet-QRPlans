import React, { useState } from 'react'
import {
  generateUniqueFolderName,
  sanitizeFoldersInput,
} from '../services/helpers'
import { useDashboardStore } from '../lib/store'
import { shallow } from 'zustand/shallow'
import { createNewFolderAction } from '@/app/actions/folders/createFolder.action'
import { toast } from 'react-toastify'
import { updateFolderNameAction } from '@/app/actions/folders/UpdateFolderName.action'

export const useUpdateFolderName = () => {
  const [folderName, setFolderName] = useState('')
  const { folders, addFolder, updateFolderId, removeFolder } =
    useDashboardStore(
      (state) => ({
        folders: state.folders,
        addFolder: state.addFolder,
        updateFolderId: state.updateFolderId,
        removeFolder: state.removeFolder,
      }),
      shallow
    )

  const handleUpdateFolderName = async (folderId: string, newName: string) => {
    const trimmedFolder = folderName.trim()
    if (trimmedFolder.length === 0) return

    const uniqueFolderName = generateUniqueFolderName(trimmedFolder, folders)

    // setFolderName('')
    try {
      const res = await updateFolderNameAction(folderId, newName)
      // updateFolderId(tempId, res.folderName.id)
      toast.success('Dossier créé avec succès')
    } catch (error) {
      // removeFolder(tempId)
      toast.error('Erreur lors de la création du dossier')
      console.error('Error creating folderName:', error)
    }
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedInput = sanitizeFoldersInput(e.target.value)
    setFolderName(sanitizedInput)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape' && folderName.trim().length > 0) {
      setFolderName('')
    }
    if (e.key === 'Enter') {
      // handleUpdateFolderName()
    }
  }
  return {
    handleUpdateFolderName,
    folderName,
    setFolderName,
    handleOnChange,
    handleKeyPress,
  }
}
