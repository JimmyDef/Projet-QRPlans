import { ButtonHTMLAttributes } from 'react'
import { Loader } from '@/src/components/ui/loader/Loader'
import './submit-button.scss'
interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  text: string
  className?: string
  loaderClassName?: string
}

export const SubmitButton = ({
  isLoading = false,
  text,
  className = '',
  loaderClassName = 'loader-spinner-submit-btn',
  type = 'submit',
  disabled,
  ...rest
}: SubmitButtonProps) => {
  return (
    <button
      type={type}
      className={`button ${className}`}
      disabled={isLoading || disabled}
      {...rest}
    >
      {isLoading ? (
        <Loader extraClass={loaderClassName} />
      ) : (
        <span>{text}</span>
      )}
    </button>
  )
}
