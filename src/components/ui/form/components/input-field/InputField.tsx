'use client'
import Image from 'next/image'
import React, { forwardRef } from 'react'
import './input-field.scss'

export interface FormInputField {
  label: string
  name: string
  type: string
  value: string
  icon?: string
  placeholder: string
  autoComplete: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: () => void
  isValid: boolean
  inputClassName?: string
  containerClassName?: string
}

export const FormInputField = forwardRef<HTMLInputElement, FormInputField>(
  (
    {
      label,
      name,
      type,
      value,
      icon,
      placeholder,
      autoComplete,
      onChange,
      onBlur,
      isValid = true,
      containerClassName = '',
    },
    ref
  ) => {
    return (
      <div className={`form-input-field__container ${containerClassName}`}>
        <label className="form-input-field__label" htmlFor={name}>
          {label}
        </label>
        {icon && (
          <Image
            className="form-input-field__icon"
            width={30}
            height={30}
            src={`/icons/${icon}.svg`}
            alt={`${name} icon`}
          />
        )}
        <input
          ref={ref}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          name={name}
          type={type}
          className={`form-input-field__input ${
            !isValid && !value ? 'form-input-field__input--error' : ''
          }`}
          id={`${name}_field`}
          autoComplete={autoComplete}
          onBlur={onBlur}
        />
      </div>
    )
  }
)

FormInputField.displayName = 'FormInputField'
