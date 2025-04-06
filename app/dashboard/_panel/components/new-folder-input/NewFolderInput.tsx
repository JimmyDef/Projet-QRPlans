// components/NewFolderInput.jsx
import { FolderPlus } from 'lucide-react'
import './new-folder-input.scss'
// import { NewFolderInputProps } from '@/src/types/types'
import { useCreateFolder } from '@/src/hooks/useCreateFolder'
import { set } from 'zod'
import { use, useEffect, useRef } from 'react'

const NewFolderInput = (
  {
    // newFolder,
    // handleAddNewFolder,
    // handleOnChange,
    // handleKeyPress,
  }
) => {
  const {
    handleAddNewFolder,
    newFolder,
    setNewFolder,
    handleOnChange,
    handleKeyPress,
  } = useCreateFolder()
  const newFolderContainerRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const handleClickOutiside = (e: MouseEvent) => {
      if (
        newFolderContainerRef.current &&
        !newFolderContainerRef.current.contains(e.target as Node)
      ) {
        setNewFolder('')
      }
    }
    document.addEventListener('click', handleClickOutiside)
    return () => document.removeEventListener('click', handleClickOutiside)
  })
  return (
    <div className="panel__new-folder-container" ref={newFolderContainerRef}>
      <FolderPlus
        className="panel__new-folder-icon"
        onClick={handleAddNewFolder}
      />
      <input
        type="text"
        placeholder="Nouveau Dossier"
        className="panel__folder-input"
        minLength={1}
        maxLength={17}
        value={newFolder}
        onChange={handleOnChange}
        onKeyDown={handleKeyPress}
      />
    </div>
  )
}

export default NewFolderInput
