import {
  DashboardStore,
  File,
  FolderStore,
  themeState,
} from '@/src/types/types'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { createWithEqualityFn } from 'zustand/traditional'

export const useThemeStore = create<themeState>()(
  persist(
    (set) => ({
      theme: 'light',
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
export const useDashboardStore = createWithEqualityFn<DashboardStore>()(
  persist(
    (set) => ({
      files: [],
      folders: [],
      activeFolderId: null,
      setActiveFolderId: (id) => set({ activeFolderId: id }),
      setFiles: (files: File[]) => set({ files }),
      addFile: (file: File) =>
        set((state: { files: File[] }) => ({ files: [...state.files, file] })),
      updateFile: (file: File) =>
        set((state: { files: File[] }) => ({
          files: state.files.map((f) => (f.id === file.id ? file : f)),
        })),
      addFolder: (folder) =>
        set((state) => ({
          folders: [...state.folders, folder].sort((a, b) =>
            a.name.localeCompare(b.name)
          ),
        })),
      setFolders: (folders: FolderStore[]) => set({ folders }),

      updateFolderName: (folderId: string, newName: string) =>
        set((state) => ({
          ...state,
          folders: state.folders.map((folder) =>
            folder.id === folderId ? { ...folder, name: newName } : folder
          ),
        })),

      updateFolderId: (tempId, newId) =>
        set((state) => {
          const index = state.folders.findIndex(
            (folder) => folder.id === tempId
          )
          if (index === -1) {
            console.error(
              `Dossier avec l'ID temporaire ${tempId} non trouvé lors de la mise à jour de l'ID.`
            )
            return state
          }

          const updatedFolders = [...state.folders]

          updatedFolders[index] = {
            ...updatedFolders[index],
            id: newId,
            isTemporary: false,
          }
          return { folders: updatedFolders }
        }),

      removeFolder: (folderId: string) => {
        console.log('removeFolder:', folderId)
        set((state) => ({
          folders: state.folders.filter((f) => f.id !== folderId),
        }))
        return
      },

      removeAllFolders: () =>
        set(() => ({
          folders: [],
        })),
    }),

    {
      name: 'dashboard-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
