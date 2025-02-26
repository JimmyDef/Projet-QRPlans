'use client'
import Loader from '@/src/components/ui/loader/Loader'
import { isNum } from '@/src/lib/helpers'
import { useAuthStore } from '@/src/lib/store'
import { useCallback, useEffect, useRef, useState } from 'react'
import './otp.scss'

type OtpProps = {
  length?: number
  onComplete: (code: string) => void
  isPending: boolean
  setInputRef?: (ref: HTMLInputElement | null) => void
}
export const Otp = ({
  length = 6,
  onComplete,
  isPending,
  setInputRef,
}: OtpProps) => {
  const [codes, setCodes] = useState<string[]>(() => Array(6).fill(''))
  const inputsRef = useRef<Array<HTMLInputElement | null>>([])

  const updateCodesAtIndex = (index: number, value: string) => {
    const updatedCodes = [...codes]
    updatedCodes[index] = value
    setCodes(updatedCodes)
  }

  const checkCompletion = useCallback((codes: string[]) => {
    const isCodeCompleted = !codes.includes('')
    if (isCodeCompleted) {
      onComplete(codes.join(''))

      setCodes(Array(6).fill(''))
    }
  }, [])

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
    if (setInputRef) {
      setInputRef(inputsRef.current[0])
    }
  }, [])
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
    </div>
  )
}

// ('use client')
// import { useCallback, useEffect, useRef, useState } from 'react'
// import './otp.scss' // ton style, ou un style scss plus générique

// type OtpProps = {
//   length?: number
//   onComplete?: (code: string) => void
//   onChangeCode?: (code: string) => void // Optionnel : callback à chaque frappe
//   loading?: boolean // Pour désactiver inputs / afficher un spinner
// }

// export function OtpInput({
//   length = 6,
//   onComplete,
//   onChangeCode,
//   loading = false,
// }: OtpProps) {
//   const [codes, setCodes] = useState<string[]>(() => Array(length).fill(''))
//   const inputsRef = useRef<HTMLInputElement[]>([])

//   // Met à jour un digit
//   const updateCodesAtIndex = (index: number, value: string) => {
//     setCodes((prev) => {
//       const updated = [...prev]
//       updated[index] = value
//       return updated
//     })
//   }

//   // Vérifier si tous les digits sont remplis
//   const checkCompletion = useCallback(
//     (codesArr: string[]) => {
//       const isCompleted = !codesArr.includes('')
//       if (isCompleted && onComplete) {
//         const fullCode = codesArr.join('')
//         onComplete(fullCode)
//       }
//       // Appelle onChangeCode si fourni (à chaque modif)
//       if (onChangeCode) {
//         onChangeCode(codesArr.join(''))
//       }
//     },
//     [onComplete, onChangeCode]
//   )

//   // Gérer la frappe de touches
//   const handleKeyDown = (
//     idx: number,
//     e: React.KeyboardEvent<HTMLInputElement>
//   ) => {
//     const { key } = e
//     const prevFocus = inputsRef.current[idx - 1]
//     const nextFocus = inputsRef.current[idx + 1]

//     // Si c’est un chiffre
//     if (/^[0-9]$/.test(key)) {
//       updateCodesAtIndex(idx, key)
//       // passer au suivant
//       nextFocus?.focus()
//     }

//     // Backspace
//     if (key === 'Backspace') {
//       e.preventDefault()
//       if (!codes[idx]) {
//         // On remonte au précédent
//         if (idx > 0) {
//           updateCodesAtIndex(idx - 1, '')
//           prevFocus?.focus()
//         }
//       } else {
//         // On efface la case courante
//         updateCodesAtIndex(idx, '')
//       }
//     }

//     // Flèche gauche
//     if (key === 'ArrowLeft' && idx > 0) {
//       e.preventDefault()
//       prevFocus?.focus()
//     }
//     // Flèche droite
//     if (key === 'ArrowRight' && idx < length - 1) {
//       e.preventDefault()
//       nextFocus?.focus()
//     }
//   }

//   // Gérer le coller
//   const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
//     e.preventDefault()
//     const pasteData = e.clipboardData.getData('text') || ''
//     // extraire uniquement digits
//     const digits = pasteData.replace(/\D/g, '').split('').slice(0, length)

//     setCodes((prev) => {
//       const updated = [...prev]
//       digits.forEach((digit, i) => {
//         updated[i] = digit
//       })
//       return updated
//     })

//     // focus la case suivant la dernière collée
//     if (digits.length < length) {
//       inputsRef.current[digits.length]?.focus()
//     }
//   }

//   // Checker la complétion à chaque fois que `codes` change
//   useEffect(() => {
//     checkCompletion(codes)
//   }, [codes, checkCompletion])

//   // Au montage, focus la première case
//   useEffect(() => {
//     if (!loading) {
//       inputsRef.current[0]?.focus()
//     }
//   }, [loading])

//   return (
//     <div className="otp-container">
//       <div className="otp-input-wrapper">
//         {codes.map((val, idx) => (
//           <input
//             key={idx}
//             ref={(el) => {
//               if (el) inputsRef.current[idx] = el
//             }}
//             className="otp-slot"
//             type="text"
//             maxLength={1}
//             value={val}
//             readOnly={true} // on gère tout manuellement
//             disabled={loading}
//             onKeyDown={(e) => handleKeyDown(idx, e)}
//             onPaste={handlePaste}
//           />
//         ))}
//       </div>
//     </div>
//   )
// }
