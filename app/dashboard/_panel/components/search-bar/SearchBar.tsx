// components/SearchBar.jsx
import { Search } from 'lucide-react'
import './search-bar.scss'

const SearchBar = () => {
  return (
    <div className="panel__search-container">
      <input
        type="text"
        placeholder="Recherche QR Codes.."
        className="panel__search-input"
      />
      <Search className="panel__search-icon" />
    </div>
  )
}

export default SearchBar
