'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import './otp.scss'
import { isNum } from '@/src/lib/helpers'

type OtpProps = {
  length?: number
}
export const Otp = ({ length = 6 }: OtpProps) => {
  const [codes, setCodes] = useState<string[]>(() => Array(6).fill(''))
  const inputsRef = useRef<Array<HTMLInputElement | null>>([])

  const updateCodesAtIndex = (index: number, value: string) => {
    const updatedCodes = [...codes]
    updatedCodes[index] = value
    setCodes(updatedCodes)
  }

  const checkCompletion = useCallback(
    (codes: string[]) => {
      const isCodeCompleted = !codes.includes('')
      if (isCodeCompleted) {
        setCodes(Array(length).fill(''))
        inputsRef.current[0]?.focus()
      }
    },
    [length]
  )

  const handleKeyDown = (
    idx: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const isNumKey = isNum(e.key)
    const prevFocus = inputsRef.current[idx - 1]
    const nextFocus = inputsRef.current[idx + 1]

    if (isNumKey) {
      updateCodesAtIndex(idx, e.key)
      nextFocus?.focus()
    }

    if (e.key === 'Backspace') {
      e.preventDefault()
      if (!codes[idx]) {
        updateCodesAtIndex(idx - 1, '')
        prevFocus?.focus()
      }
      if (codes[idx]) {
        updateCodesAtIndex(idx, '')
      }
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      inputsRef.current[idx - 1]?.focus()
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      inputsRef.current[idx + 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pasteData = e.clipboardData.getData('text')
    const digits = pasteData.replace(/\D/g, '').split('').slice(0, 6)
    const updatedCodes = [...codes].map((val, idx) => digits[idx] ?? val)
    setCodes(updatedCodes)
  }

  useEffect(() => {
    inputsRef.current[0]?.focus()
  }, [])
  useEffect(() => {
    checkCompletion(codes)
  }, [codes, checkCompletion])

  return (
    <div className="otp-container">
      {codes.map((val, idx) => (
        <input
          aria-label={`OTP digit ${idx + 1} sur ${length}`}
          spellCheck={false}
          ref={(el) => {
            inputsRef.current[idx] = el
          }}
          readOnly
          autoComplete="off"
          className="otp-slot"
          key={idx}
          type="text"
          value={val}
          onKeyDown={(e) => handleKeyDown(idx, e)}
          onPaste={handlePaste}
          maxLength={1}
          style={{ order: idx * 2 }}
        />
      ))}
      <div className="otp-separator"></div>
    </div>
  )
}
