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
import { useRemoveFolder } from '@/src/hooks/useRemoveFolder'
export const FolderButton = ({
  folder,
  isActive,
  onClick,

  onRename,
}: FolderButtonProps) => {
  const { handleRemoveFolder } = useRemoveFolder()
  const [isRenaming, setIsRenaming] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [value, setValue] = useState(folder.name)

  useEffect(() => {
    if (isRenaming) {
      inputRef.current?.focus()
    }
  }, [isRenaming])

  return (
    <div
      tabIndex={0}
      className={`folder ${isActive ? 'folder--active' : ''}`}
      onClick={onClick}
    >
      <Folder className="folder__icon" />
      {isRenaming ? (
        <input
          ref={inputRef}
          type="text"
          className="folder__new-name"
          onBlur={() => setIsRenaming(false)}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          // onSubmit={() => onRename(value)}
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
            onSelect={() => {
              setIsRenaming(true)

              // inputRef?.current?.focus()
            }}
          >
            <Pencil />
            Renommer
          </DropdownMenuItem>

          <DropdownMenuItem
            onSelect={() => handleRemoveFolder(folder.id)}
            className="folder__item--red"
          >
            <Trash2 />
            Supprimer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
