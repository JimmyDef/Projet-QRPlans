'use client'
import './error-message.scss'
interface ErrorMessageProps {
  message: string | null
  children?: React.ReactNode
}

export const ErrorMessage = ({ children, message }: ErrorMessageProps) => {
  // if (!message) return null

  return (
    <p className="form-error-message">
      {message} <span>{children}</span>
    </p>
  )
}
