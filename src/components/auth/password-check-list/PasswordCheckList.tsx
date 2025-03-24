import { Dispatch, SetStateAction, useEffect } from 'react'
import Image from 'next/image'
import './password-check-list.scss'
import {
  hasLowercase,
  hasUppercase,
  hasNumber,
  hasSpecialCharacter,
  isPasswordLengthValid,
  isPasswordStrong,
} from '@/src/lib/helpers'
type PasswordCheckListProps = {
  password: string
  setIsPasswordStrong: (isStrong: boolean) => void
}

const PasswordCheckList = ({
  password,
  setIsPasswordStrong,
}: PasswordCheckListProps) => {
  useEffect(() => {
    setIsPasswordStrong(isPasswordStrong(password))
  }, [password])

  const getIcon = (isValid: boolean): string =>
    isValid ? '/icons/check.svg' : '/icons/dot.svg'

  return (
    <div className="PasswordCheckList__wrapper">
      <ul className="PasswordCheckList__list">
        <li className="PasswordCheckList__item">
          <Image
            className="PasswordCheckList__icon"
            width={20}
            height={20}
            src={getIcon(hasLowercase(password))}
            alt="icon"
          />
          At least one lowercase character (a-z)
        </li>
        <li className="PasswordCheckList__item">
          <Image
            className="PasswordCheckList__icon"
            width={20}
            height={20}
            src={getIcon(hasUppercase(password))}
            alt="icon"
          />
          At least one uppercase character (A-Z)
        </li>
        <li className="PasswordCheckList__item">
          <Image
            className="PasswordCheckList__icon"
            width={20}
            height={20}
            src={getIcon(hasNumber(password))}
            alt="icon"
          />
          At least one number (0-9)
        </li>
        <li className="PasswordCheckList__item">
          <Image
            className="PasswordCheckList__icon"
            width={20}
            height={20}
            src={getIcon(hasSpecialCharacter(password))}
            alt="icon"
          />
          At least one special character (!@#$%^&*)
        </li>
        <li className="PasswordCheckList__item">
          <Image
            className="PasswordCheckList__icon"
            width={20}
            height={20}
            src={getIcon(isPasswordLengthValid(password))}
            alt="icon"
          />
          Between 8 to 20 characters
        </li>
      </ul>
    </div>
  )
}

export default PasswordCheckList
