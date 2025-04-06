import { deleteFolderAction } from '@/app/actions/folders/deleteFolder.action'
import { useDashboardStore } from '@/src/lib/store'
import { Folders } from 'lucide-react'
import { toast } from 'react-toastify'

export const useDeleteFolder = () => {
  const { folders, addFolder, removeFolder } = useDashboardStore((state) => ({
    addFolder: state.addFolder,
    removeFolder: state.removeFolder,
    folders: state.folders,
  }))

  const handleRemoveFolder = async (folderId: string) => {
    const currentFolder = folders.find((folder) => folder.id === folderId)
    if (!currentFolder) {
      console.error('Folder not found.')
      return
    }

    try {
      if (!folderId) {
        console.error('Folder ID is required.')
        return
      }
      removeFolder(folderId)
      deleteFolderAction(folderId)
    } catch (error) {
      addFolder(currentFolder)
      console.error('Error deleting folder:', error)
      toast.error('Failed to delete folder.')
    }
  }

  return {
    handleRemoveFolder,
  }
}
