import { FolderButton } from '@/app/dashboard/_components/Folder-button/FolderButton'

export type User = {
  id: null
  name?: string | null
  email?: string | null
  image?: string | null
}

export type File = {
  id: string
  name: string
  url: string
  qrCode: string
  status: 'ACTIVE' | 'PAUSED' | 'DELETED'
}

export interface Folder {
  id: string
  name: string
  files: File[]
}

export interface FolderButtonProps {
  folder: Folder
  isActive: boolean
  onClick: () => void
}

export interface FolderStore extends Folder {
  isTemporary?: boolean
}

export interface DashboardStore {
  files: File[]
  folders: FolderStore[]
  activeFolderId: String | null
  updateFolderId: (tempId: string, newId: string) => void
  addFile: (file: File) => void
  addFolder: (folder: FolderStore) => void
  setActiveFolderId: (id: string | null) => void
  updateFile: (file: File) => void
  setFiles: (files: File[]) => void
  setFolders: (folders: FolderStore[]) => void
  removeAllFolders: () => void
  removeFolder: (folderId: string) => void
}
export type DashboardDataProviderProps = {
  files: File[]
  folders: FolderStore[]
  userId?: string
}
