import { EllipsisVertical, Folder, Pencil, Trash2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
// import { DropdownFolderOptions } from './DropdownFolderOptions'
// import { useDashboardStore } from '@/src/lib/store'
import { FolderButtonProps } from '@/src/types/types'
import './folder-button.scss'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu'
import { useDeleteFolder } from '@/src/hooks/useDeleteFolder'
import { useUpdateFolderName } from '@/src/hooks/useUpdateFolderName'
import { useDashboardStore } from '@/src/lib/store'
import { shallow } from 'zustand/shallow'
export const FolderButton = ({ folder }: FolderButtonProps) => {
  const { handleRemoveFolder } = useDeleteFolder()
  const { handleUpdateFolderName } = useUpdateFolderName()
  const [isRenaming, setIsRenaming] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [folderName, setFolderName] = useState(folder.name)

  const { activeFolderId, setActiveFolderId } = useDashboardStore(
    (state) => ({
      // folders: state.folders,
      activeFolderId: state.activeFolderId,
      setActiveFolderId: state.setActiveFolderId,
    }),
    shallow
  )
  const isActive = activeFolderId === folder.id

  const handleOnClick = (folderId: string) => {
    if (activeFolderId !== folderId) {
      setActiveFolderId(folderId)
    }
  }
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleUpdateFolderName(folder.id, folderName)
      setIsRenaming(false)
    }
    if (e.key === 'Escape') {
      setFolderName(folder.name)
      setIsRenaming(false)
    }
  }
  useEffect(() => {
    if (isRenaming) {
      inputRef.current?.focus()
    }
  }, [isRenaming])

  return (
    <div
      tabIndex={0}
      className={`folder ${isActive ? 'folder--active' : null}`}
      onClick={() => {
        handleOnClick(folder.id)
      }}
    >
      <Folder className="folder__icon" />
      {isRenaming ? (
        <input
          maxLength={17}
          ref={inputRef}
          type="text"
          className="folder__new-name"
          onBlur={() => {
            handleUpdateFolderName(folder.id, folderName)
            setIsRenaming(false)
          }}
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          onKeyDown={handleKeyPress}
        />
      ) : (
        <p className="folder__name">{folder.name}</p>
      )}
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="folder__triggerBtn">
          <EllipsisVertical
            data-tooltip-position-strategy="fixed"
            data-tooltip-id="tooltip-folder-menu-options"
            data-tooltip-content="Options"
            className="folder__menu-icon "
            tabIndex={-1}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          sideOffset={15}
          side="right"
          align="start"
          className="folder__menu-select"
          onCloseAutoFocus={(e) => {
            e.preventDefault()
          }}
        >
          <DropdownMenuItem
            className="folder__menu-item"
            onSelect={() => {
              setIsRenaming(true)
              console.log('inputRef:', inputRef)
              inputRef?.current?.focus()
            }}
          >
            <Pencil />
            Renommer
          </DropdownMenuItem>

          <DropdownMenuItem
            onSelect={() => handleRemoveFolder(folder.id)}
            className="folder__menu-item folder__menu-item--delete"
          >
            <Trash2 />
            Supprimer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
