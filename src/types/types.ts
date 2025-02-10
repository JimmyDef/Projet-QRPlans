import { useUpdateFolderName } from './../hooks/useUpdateFolderName'
export interface User {
  id: null
  name?: string | null
  email?: string | null
  image?: string | null
}

export interface File {
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
export interface FolderStore extends Folder {
  isTemporary?: boolean
}

export interface FolderListProps {
  folders: Folder[]
  activeFolderId: string | null
  setActiveFolderId: (id: string) => void
  scrollContainerRef: React.RefObject<HTMLDivElement>
}
// export interface NewFolderInputProps {
//   newFolder: string
//   handleAddNewFolder: () => void
//   handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void
//   handleKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void
// }
export interface FolderButtonProps {
  folder: Folder
  isActive: boolean
  onClick: () => void
}
export interface ScrollArrowsProps {
  showTopArrow: boolean
  showBottomArrow: boolean
  handleScrollUp: () => void
  handleScrollDown: () => void
}

export interface DashboardStore {
  files: File[]
  folders: FolderStore[]
  activeFolderId: string | null
  updateFolderId: (tempId: string, newId: string) => void
  addFile: (file: File) => void
  addFolder: (folder: FolderStore) => void
  setActiveFolderId: (id: string | null) => void
  updateFile: (file: File) => void
  updateFolderName: (folderId: string, newName: string) => void
  setFiles: (files: File[]) => void
  setFolders: (folders: FolderStore[]) => void
  removeAllFolders: () => void
  removeFolder: (folderId: string) => void
}

export type themeState = {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}
export interface DashboardDataProviderProps {
  files: File[]
  folders: FolderStore[]
  userId?: string
}
