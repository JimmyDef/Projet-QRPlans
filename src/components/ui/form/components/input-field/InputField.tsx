'use client'
import Image from 'next/image'
// import React, { forwardRef } from 'react'
import './input-field.scss'
import type { Ref, HTMLInputTypeAttribute } from 'react'
import { Eye, EyeClosed } from 'lucide-react'

export interface FormInputField {
  label: string
  name: string
  type: HTMLInputTypeAttribute
  value: string
  icon?: string
  placeholder: string
  autoComplete: string
  isPassword?: boolean
  isPasswordVisible?: boolean
  togglePasswordVisibility?: () => void
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: () => void
  isValid: boolean
  inputClassName?: string
  containerClassName?: string
  ref?: Ref<HTMLInputElement>
}

export const FormInputField = ({
  label,
  name,
  type,
  value,
  icon,
  isPassword,
  isPasswordVisible,
  togglePasswordVisibility,
  placeholder,
  autoComplete,
  onChange,
  onBlur,
  isValid = true,
  containerClassName = '',
  ref,
}: FormInputField) => {
  if (isPassword)
    return (
      <div className={`form-input-field__container ${containerClassName}`}>
        <label className="form-input-field__label" htmlFor={`${name}_field`}>
          {label}
        </label>
        {icon && (
          <Image
            className="form-input-field__icon"
            width={30}
            height={30}
            src={`/icons/${icon}.svg`}
            alt={`${label} input icon`}
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
          aria-invalid={!isValid}
        />
        {isPassword}
        <button
          tabIndex={-1}
          type="button"
          className="form-input-field__password-toggle"
          onClick={togglePasswordVisibility}
          aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
        >
          {isPasswordVisible ? (
            <Eye
              strokeWidth={1.2}
              aria-hidden="true"
              className="form-input-field__show-password-icon"
            />
          ) : (
            <EyeClosed
              strokeWidth={1.2}
              aria-hidden="true"
              className="form-input-field__show-password-icon"
            />
          )}
        </button>
      </div>
    )
  return (
    <div className={`form-input-field__container ${containerClassName}`}>
      <label className="form-input-field__label" htmlFor={`${name}_field`}>
        {label}
      </label>
      {icon && (
        <Image
          className="form-input-field__icon"
          width={30}
          height={30}
          src={`/icons/${icon}.svg`}
          alt={`${label} input icon`}
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
        aria-invalid={!isValid}
      />
    </div>
  )
}

FormInputField.displayName = 'FormInputField'
