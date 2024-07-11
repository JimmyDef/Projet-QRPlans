import Image from 'next/image'
// import { signIn } from '@/lib/auth'
import { AuthButton } from '@/components/auth-button/AuthButton'
import './sign-in.scss'
const SignIn = () => {
  return (
    <form className="sign-in_form_container">
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
        <label className="input_label" htmlFor="email_field">
          Email
        </label>

        <Image
          className="icon"
          width={30}
          height={30}
          src="/logos/email.svg"
          alt="email icon"
        />
        <input
          placeholder="name@mail.com"
          title="Input title"
          name="input-name"
          type="text"
          className="input_field"
          id="email_field"
        />
      </div>
      <div className="input_container">
        <label className="input_label" htmlFor="password_field">
          Password
        </label>
        <Image
          className="icon"
          width={30}
          height={30}
          src="/logos/password.svg"
          alt="email icon"
        />
        <input
          placeholder="Password"
          title="Input title"
          name="input-name"
          type="password"
          className="input_field"
          id="password_field"
          autoComplete="current-password"
        />
      </div>
      <button title="Sign In" type="submit" className="sign-in_btn">
        <span>Sign In</span>
      </button>
      <div className="separator">
        <hr className="line" />
        <span>Or</span>
        <hr className="line" />
      </div>
      <button
        title="Sign In with Google"
        type="button"
        className="sign-in__brand sign-in__brand--google"
      >
        <Image
          className="icon"
          width={30}
          height={30}
          src="/logos/google.svg"
          alt="google icon"
        />
        <span>Sign In with Google</span>
      </button>
      <AuthButton className="sign-in__brand sign-in__brand--github">
        <Image
          className="icon"
          width={30}
          height={30}
          src="/logos/github.svg"
          alt="github icon"
        />
        <span>Sign In with GitHub</span>
      </AuthButton>
      <button
        title="Sign In with Facebook"
        type="button"
        className="sign-in__brand sign-in__brand--facebook"
      >
        <Image
          className="icon"
          width={30}
          height={30}
          src="/logos/facebook.svg"
          alt="facebook icon"
        />
        <span>Sign In with Facebook</span>
      </button>
      <button
        title="Sign In with Apple"
        type="button"
        className="sign-in__brand sign-in__brand--apple"
      >
        <Image
          className="icon"
          width={30}
          height={30}
          src="/logos/apple.svg"
          alt="apple icon"
        />
        <span>Sign In with Apple</span>
      </button>
      <p className="note">Terms of use &amp; Conditions</p>
    </form>
  )
}
export default SignIn
