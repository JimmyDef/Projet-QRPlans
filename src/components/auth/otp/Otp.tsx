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
import testaction from '@/app/actions/folders/testaction.action'
import { toast } from 'react-toastify'

type OtpProps = {
  length?: number
}
export const Otp = ({ length = 6 }: OtpProps) => {
  const initialState = { message: '' }
  const [codes, setCodes] = useState<string[]>(() => Array(6).fill(''))
  const inputsRef = useRef<Array<HTMLInputElement | null>>([])
  const [messages, onCompletionAction, isPending] = useActionState(
    testaction,
    initialState
  )
  const OTPInvalidMessage = 'Code expiré ou invalide.'

  const updateCodesAtIndex = (index: number, value: string) => {
    const updatedCodes = [...codes]
    updatedCodes[index] = value
    setCodes(updatedCodes)
  }

  // const handleOtpCompletion = useCallback(async () => {
  //   startTransition(async () => {
  //     onCompletionAction(codes.join(''))
  //   })
  // }, [codes, onCompletionAction])

  const checkCompletion = useCallback(
    (codes: string[]) => {
      const isCodeCompleted = !codes.includes('')
      if (isCodeCompleted) {
        startTransition(async () => {
          onCompletionAction(codes.join(''))
        })
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
    if (!messages.message) return

    if (!isPending && messages.message === 'Code expiré ou invalide.') {
      setCodes(Array(6).fill(''))
      toast.error('Code expiré ou invalide.')
      return
    }
  }, [messages.message, isPending])
  return (
    <div className="otp-container">
      <div className="otp-input-wrapper">
        {codes.map((val, idx) => (
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
            style={{ order: idx * 2 }}
          />
        ))}
        <div className="otp-separator"></div>
      </div>
      <p className="otp-message">{messages.message}</p>
    </div>
  )
}
