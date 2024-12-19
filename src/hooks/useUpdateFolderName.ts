import React, { useState } from 'react'
import { generateUniqueFolderName, sanitizeFoldersInput } from '../lib/helpers'
import { useDashboardStore } from '../lib/store'
import { shallow } from 'zustand/shallow'
import { createNewFolderAction } from '@/app/actions/folders/createFolder.action'
import { toast } from 'react-toastify'
import { updateFolderNameAction } from '@/app/actions/folders/UpdateFolderName.action'

export const useUpdateFolderName = () => {
  const [folderName, setFolderName] = useState('')
  const { folders, addFolder, updateFolderName, removeFolder } =
    useDashboardStore(
      (state) => ({
        folders: state.folders,
        addFolder: state.addFolder,
        updateFolderName: state.updateFolderName,
        removeFolder: state.removeFolder,
      }),
      shallow
    )

  const handleUpdateFolderName = async (folderId: string, newName: string) => {
    const trimmedNewName = newName.trim()
    if (trimmedNewName.length === 0) return
    const oldFolder = folders.find((folder) => folder.id === folderId)
    if (!oldFolder) {
      console.error(`Dossier avec l'ID ${folderId} non trouvé`)
      return
    }
    const oldFolderName = oldFolder?.name
    const uniqueFolderName = generateUniqueFolderName(trimmedNewName, folders)
    updateFolderName(folderId, uniqueFolderName)

    try {
      await updateFolderNameAction(folderId, uniqueFolderName)
      toast.success('Dossier créé avec succès')
    } catch (error) {
      updateFolderName(folderId, oldFolderName)
      toast.error('Erreur lors de la création du dossier')
      console.error('Error creating folderName:', error)
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
