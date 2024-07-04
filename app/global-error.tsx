'use server'
import './../sass/global-error.scss'

const GlobalError = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <div className="error-container">
      <h1 className="error-title">Something went wrong</h1>
      <p className="error-message">{error.message}</p>
      <button className="error-button" onClick={reset}>
        Try Again
      </button>
    </div>
  )
}

export default GlobalError
