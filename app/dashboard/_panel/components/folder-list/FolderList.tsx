import { Tooltip } from 'react-tooltip'
import { FolderButton } from '@/app/dashboard/_panel/components/Folder-buttons/FolderButton'
import './folder-list.scss'
import { Folder } from '@/src/types/types'
import { FolderListProps } from '@/src/types/types'

const FolderList: React.FC<FolderListProps> = ({
  folders,
  activeFolderId,
  setActiveFolderId,
  scrollContainerRef,
}) => {
  const handleOnClick = (folderId: string) => {
    if (activeFolderId !== folderId) {
      setActiveFolderId(folderId)
    }
  }
  return (
    <div className="panel__folders-wrapper" ref={scrollContainerRef}>
      <Tooltip id="tooltip-folder-menu-options" offset={13} opacity={1} />
      {folders.map((folder: Folder) => (
        <FolderButton
          key={folder.id}
          folder={folder}
          isActive={activeFolderId === folder.id}
          onClick={() => {
            handleOnClick(folder.id)
          }}
        />
      ))}
    </div>
  )
}

export default FolderList
