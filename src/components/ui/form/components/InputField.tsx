'use client'
import Image from 'next/image'
import React from 'react'

interface InputFieldProps {
  label: string
  name: string
  type: string
  value: string
  icon: string
  placeholder: string
  autoComplete: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  extraClassName?: string
  required?: boolean
  isFormValid?: boolean
}

export const InputField = ({
  label,
  name,
  type,
  value,
  icon,
  placeholder,
  autoComplete,
  onChange,
  extraClassName = '',
  required = false,
  isFormValid = true,
}: InputFieldProps) => (
  <div className="input-container">
    <label className="input-label" htmlFor={name}>
      {label}
    </label>
    <Image
      className="icon-credential"
      width={30}
      height={30}
      src={`/icons/${icon}.svg`}
      alt={`${name} icon`}
    />
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      name={name}
      type={type}
      className={`input-field ${extraClassName} ${
        !isFormValid && !value ? 'input-error' : ''
      }`}
      id={`${name}_field`}
      autoComplete={autoComplete}
      required={required}
    />
  </div>
)
