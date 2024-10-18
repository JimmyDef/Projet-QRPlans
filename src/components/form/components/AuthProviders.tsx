import React, { Dispatch, SetStateAction } from 'react'
import { AuthButton } from '@/src/components/buttons/auth/AuthButton'
import Image from 'next/image'
import './auth-providers.scss'
interface AuthProvidersProps {
  isLoading: boolean
  setIsLoading: Dispatch<SetStateAction<boolean>>
}

export const AuthProviders = ({
  isLoading,
  setIsLoading,
}: AuthProvidersProps) => {
  return (
    <div className="auth-provider__wrapper">
      <AuthButton
        className="auth-provider__brand auth-provider__brand--google"
        provider="google"
        setIsLoading={setIsLoading}
        isLoading={isLoading}
        title="Sign In with Google"
      >
        <Image
          className="auth-provider__icon"
          width={30}
          height={30}
          src="/icons/google.svg"
          alt="google icon"
        />
        <span className="auth-provider__label">Google</span>
      </AuthButton>

      <AuthButton
        className="auth-provider__brand auth-provider__brand--github"
        provider="github"
        setIsLoading={setIsLoading}
        isLoading={isLoading}
        title="Sign In with GitHub"
      >
        <Image
          className="auth-provider__icon"
          width={30}
          height={30}
          src="/icons/github.svg"
          alt="github icon"
        />
        <span className="auth-provider__label">GitHub</span>
      </AuthButton>

      <AuthButton
        className="auth-provider__brand auth-provider__brand--facebook"
        provider="facebook"
        setIsLoading={setIsLoading}
        isLoading={isLoading}
        title="Sign In with Facebook"
      >
        <Image
          className="auth-provider__icon"
          width={30}
          height={30}
          src="/icons/facebook.svg"
          alt="facebook icon"
        />
        <span className="auth-provider__label">Facebook</span>
      </AuthButton>

      <AuthButton
        className="auth-provider__brand auth-provider__brand--linkedin"
        provider="linkedin"
        setIsLoading={setIsLoading}
        isLoading={isLoading}
        title="Sign In with LinkedIn"
      >
        <Image
          className="auth-provider__icon auth-provider__icon--linkedin"
          width={32}
          height={32}
          src="/icons/linkedin.svg"
          alt="linkedin icon"
        />
        <span className="auth-provider__label">LinkedIn</span>{' '}
      </AuthButton>
    </div>
  )
}
