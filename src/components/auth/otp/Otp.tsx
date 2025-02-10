'use client'
import {
  startTransition,
  useActionState,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import './otp.scss'
import { isNum } from '@/src/lib/helpers'
import OTPValidationAction from '@/app/actions/otp/OtpValidation.action'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import Loader from '@/src/components/ui/loader/Loader'

type OtpProps = {
  length?: number
}
export const Otp = ({ length = 6 }: OtpProps) => {
  const router = useRouter()
  const [codes, setCodes] = useState<string[]>(() => Array(6).fill(''))
  const inputsRef = useRef<Array<HTMLInputElement | null>>([])
  const [error, onCompletionAction, isPending] = useActionState(
    OTPValidationAction,
    {
      message: '',
      success: false,
    }
  )
  const OTPInvalidMessage = error.message ? 'Code invalide ou expiré.' : ''
  const updateCodesAtIndex = (index: number, value: string) => {
    const updatedCodes = [...codes]
    updatedCodes[index] = value
    setCodes(updatedCodes)
  }

  const checkCompletion = useCallback(
    (codes: string[]) => {
      const isCodeCompleted = !codes.includes('')
      if (isCodeCompleted) {
        startTransition(async () => {
          onCompletionAction(codes.join(''))
        })
        setCodes(Array(6).fill(''))
      }
    },
    [onCompletionAction]
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
    if (digits.length < 6) {
      inputsRef.current[digits.length]?.focus()
    }
  }

  useEffect(() => {
    if (!isPending && codes.every((code) => code === '')) {
      inputsRef.current[0]?.focus()
    }
  }, [codes, isPending])
  useEffect(() => {
    checkCompletion(codes)
  }, [codes, checkCompletion])

  useEffect(() => {
    if (!OTPInvalidMessage) return

    if (!isPending && OTPInvalidMessage) {
      setCodes(Array(6).fill(''))
      toast.error('Code expiré ou invalide.')
      return
    }
    if (error.success) {
      router.push('/dashboard?otp=success')
    }
  }, [OTPInvalidMessage, isPending])
  return (
    <div className="otp-container">
      <div className="otp-input-wrapper">
        {codes.map((val, idx) => (
          <div
            key={idx}
            className="otp-slot-wrapper"
            style={{ order: idx * 2 }}
          >
            <input
              disabled={isPending}
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
            />

            {isPending && <Loader extraClass="loader-spinner-var-otp-input" />}
          </div>
        ))}

        <div className="otp-separator"></div>
      </div>

      <p className="otp-message">{OTPInvalidMessage}</p>
    </div>
  )
}
