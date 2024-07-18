import Image from 'next/image'
import { AuthButton } from '@/components/buttons/AuthButton'
import './sign-in.scss'
import { useState } from 'react'

const SignInForm = () => {

const signIn = async ( formData: FormData) => {
    "use server"

  return (
    <form
      className=""
      action={async (formData) => {
        'use server'
        await signIn('credentials', formData)
      }}
    >
      <div className="logo_container"></div>
      <div className="title_container">
        <p className="title">Login to your Account</p>
        <span className="subtitle">
          Get started with our app, just create an account and enjoy the
          experience.
        </span>
      </div>
      <br />
      <div className="input_container">
        <label className="input_label" htmlFor="email">
          Email
        </label>

        <Image
          className="icon-credential"
          width={30}
          height={30}
          src="/logos/email.svg"
          alt="email icon"
        />
        <input
          placeholder="name@mail.com"
          title="Input title"
          name="email"
          type="email"
          className="input_field"
          id="email_field"
        />
      </div>
      <div className="input_container">
        <label className="input_label" htmlFor="password">
          Password
        </label>
        <Image
          className="icon-credential"
          width={30}
          height={30}
          src="/logos/password.svg"
          alt="email icon"
        />
        <input
          placeholder="Password"
          title="Input title"
          name="password"
          type="password"
          className="input_field"
          id="password_field"
          autoComplete="current-password"
        />
      </div>
      <button title="Sign In" type="submit" className="sign-in_btn">
        <span>Sign In</span>
      </button>
    </form>
  )
}
export default SignInForm
