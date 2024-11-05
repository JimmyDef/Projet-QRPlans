// src/hooks/useRemoveFolder.js
import { useDashboardStore } from '@/src/lib/store'
import { removeFolderAction } from '@/app/actions/folders.action'
import { shallow } from 'zustand/shallow'
import { toast } from 'react-toastify'

export const useRemoveFolder = () => {
  const { removeFolder } = useDashboardStore(
    (state) => ({
      removeFolder: state.removeFolder,
    }),
    shallow
  )

  const handleRemoveFolder = async (folderId: string) => {
    try {
      await removeFolderAction(folderId)
      removeFolder(folderId)
      toast.success('Dossier supprimé avec succès')
    } catch (error) {
      toast.error('Erreur lors de la suppression du dossier')
      console.error('Error removing folder:', error)
    }
  }

  return {
    handleRemoveFolder,
  }
}
