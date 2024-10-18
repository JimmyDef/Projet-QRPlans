import SessionChecker from './SessionChecker'

const SignInlayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SessionChecker />
      {children}
    </>
  )
}
export default SignInlayout
