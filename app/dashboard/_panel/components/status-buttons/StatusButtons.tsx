import { Activity, CirclePause, List } from 'lucide-react'
import './status-buttons.scss'

const StatusButtons = () => {
  return (
    <div className="panel__status-buttons">
      <button className="panel__status-button">
        <List /> Tous
      </button>
      <button className="panel__status-button">
        <Activity /> En activité
      </button>
      <button className="panel__status-button">
        <CirclePause /> En pause
      </button>
    </div>
  )
}

export default StatusButtons
