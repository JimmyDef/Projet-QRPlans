import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type File = {
  id: string
  name: string
  url: string
  qrCode: string
  status: 'ACTIVE' | 'PAUSED' | 'DELETED'
}

type Folder = {
  id: string
  name: string
  files: File[]
}

export const useDashboardStore = create(
  persist(
    (set) => ({
      files: [],
      folders: [],
      addFile: (file: File) =>
        set((state: { files: File[] }) => ({ files: [...state.files, file] })),

      addFolder: (folder: Folder) =>
        set((state: { folders: Folder[] }) => ({
          folders: [...state.folders, folder].sort((a, b) =>
            a.name.localeCompare(b.name)
          ),
        })),

      updateFolder: (folder: Folder) =>
        set((state: { folders: Folder[] }) => {
          const updatedFolders = state.folders.map((f) =>
            f.id === folder.id ? folder : f
          )
          updatedFolders.sort((a, b) => a.name.localeCompare(b.name))

          return { folders: updatedFolders }
        }),

      deleteFolder: (folderId: string) =>
        set((state: { folders: Folder[] }) => ({
          folders: state.folders.filter((f) => f.id !== folderId),
        })),

      updateFile: (file: File) =>
        set((state: { files: File[] }) => ({
          files: state.files.map((f) => (f.id === file.id ? file : f)),
        })),
    }),

    {
      name: 'dashboard-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
