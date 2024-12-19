// components/NewFolderInput.jsx
import { FolderPlus } from 'lucide-react'
import './new-folder-input.scss'
// import { NewFolderInputProps } from '@/src/types/types'
import { useAddFolder } from '@/src/hooks/useAddFolder'

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
  } = useAddFolder()
  return (
    <div className="panel__folder-input-group">
      <FolderPlus
        className="panel__new-folder-icon"
        onClick={handleAddNewFolder}
      />
      <input
        type="text"
        placeholder="Nouveau Dossier"
        className="panel__folder-input"
        minLength={1}
        maxLength={25}
        value={newFolder}
        onChange={handleOnChange}
        onKeyDown={handleKeyPress}
      />
    </div>
  )
}

export default NewFolderInput
