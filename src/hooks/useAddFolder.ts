import React, { use, useEffect, useState } from 'react'
import { generateUniqueFolderName } from '../services/helpers'
import { useDashboardStore } from '../lib/store'
import { shallow } from 'zustand/shallow'
import { createNewFolderAction } from '@/app/actions/folders.action'
import { toast } from 'react-toastify'

export const useAddFolder = () => {
  const [newFolder, setNewFolder] = useState('')
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
      const res = await createNewFolderAction(trimmedFolder, tempId)
      updateFolderId(tempId, res.folder.id)
      toast.success('Dossier créé avec succès')
    } catch (error) {
      removeFolder(tempId)
      toast.error('Erreur lors de la création du dossier')
      console.error('Error creating folder:', error)
    }
  }

  return {
    handleAddNewFolder,
    newFolder,
    setNewFolder,
  }
}
