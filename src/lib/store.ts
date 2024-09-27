import { set } from 'zod'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { User } from '@/src/lib/types'
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
interface UserStore {
  user: User | null
  setUser: (user: User | null) => void
  clearUser: () => void
}
interface DashboardStore {
  files: File[]
  folders: Folder[]

  addFile: (file: File) => void
  addFolder: (folder: Folder) => void
  updateFolder: (folder: Folder) => void
  deleteFolder: (folderId: string) => void
  updateFile: (file: File) => void
  setFiles: (files: File[]) => void
  setFolders: (folders: Folder[]) => void
  deleteAllFolders: () => void
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: User | null) => set({ user }),
      clearUser: () => {
        console.log('Clearing user from store')
        set({ user: null })
      },
    }),
    {
      name: 'user-session-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)

export const useDashboardStore = create<DashboardStore>()(
  persist(
    (set) => ({
      files: [],
      folders: [],
      setFolders: (folders: Folder[]) => set({ folders }),
      setFiles: (files: File[]) => set({ files }),
      addFile: (file: File) =>
        set((state: { files: File[] }) => ({ files: [...state.files, file] })),

      addFolder: (folder: Folder) => {
        console.log('Adding folder:', folder)
        set((state: { folders: Folder[] }) => ({
          folders: [...state.folders, folder].sort((a, b) =>
            a.name.localeCompare(b.name)
          ),
        }))
      },

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
      deleteAllFolders: () =>
        set((state: { folders: Folder[] }) => ({
          folders: [],
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
