import React from 'react'
import Image from 'next/image'
import './passwordCheckList.scss'
type PasswordCheckListProps = {
  password: string
}

const PasswordCheckList = ({ password }: PasswordCheckListProps) => {
  const hasLowercase = (password: string) => /[a-z]/.test(password)
  const hasUppercase = (password: string) => /[A-Z]/.test(password)
  const hasNumber = (password: string) => /\d/.test(password)
  const hasSpecialCharacter = (password: string) => /[!@#$%^&*]/.test(password)
  const isValidLength = (password: string) =>
    password.length >= 8 && password.length <= 20

  const getIcon = (isValid: boolean): string =>
    isValid ? '/logos/check.svg' : '/logos/dot.svg'

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
            src={getIcon(isValidLength(password))}
            alt="icon"
          />
          Between 8 to 20 characters
        </li>
      </ul>
    </div>
  )
}

export default PasswordCheckList
