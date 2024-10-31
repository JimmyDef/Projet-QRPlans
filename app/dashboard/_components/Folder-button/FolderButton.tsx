import { EllipsisVertical, Folder } from 'lucide-react'
import React, { useState } from 'react'
import { DropdownFolderOptions } from '../DropdownFolderOptions'
import { useDashboardStore } from '@/src/lib/store'
import { FolderButtonProps } from '@/src/types/types'
import './folderButton.scss'

export const FolderButton = ({
  folder,
  isActive,
  onClick,
}: FolderButtonProps) => {
  return (
    <div
      tabIndex={0}
      key={folder.id}
      className={`folder ${isActive ? 'folder--active' : ''}`}
      onClick={onClick}
    >
      <Folder className="folder__icon" />
      <p className="folder__name">{folder.name}</p>

      <DropdownFolderOptions>
        {/* <div className="folder__menu-icon-wrapper" tabIndex={-1}> */}
        <EllipsisVertical
          data-tooltip-position-strategy="fixed"
          data-tooltip-id="tooltip-folder-menu-options"
          data-tooltip-content="Options"
          className="folder__menu-icon "
        />
        {/* </div> */}
      </DropdownFolderOptions>
    </div>
  )
}
