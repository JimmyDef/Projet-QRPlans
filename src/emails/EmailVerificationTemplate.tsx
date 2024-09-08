// import { FunctionComponent } from 'react'
import { colors } from '@/variables'
import { Html, Button } from '@react-email/components'
import * as React from 'react'
interface EmailVerificationProps {
  fullName: string
  link: string
}

const EmailVerificationTemplate: React.FC<EmailVerificationProps> = ({
  fullName,
  link,
}) => {
  return (
    <Html lang="en">
      <div
        style={{
          fontFamily: 'Arial, sans-serif',
          lineHeight: '1.6',
          textAlign: 'center',
        }}
      >
        <h1 style={{ color: colors.primary }}>Welcome, {fullName}!</h1>
        <p>
          Thank you for signing up for our service. We&apos;re excited to have
          you on board!
        </p>
        <p>Please verify your email address by clicking the link below:</p>
        <p>
          <a
            href={link}
            style={{
              display: 'inline-block',
              padding: '10px 20px',
              fontSize: '16px',
              color: '#fff',
              backgroundColor: colors.secondary,
              textDecoration: 'none',
              borderRadius: '5px',
            }}
          >
            Verify Email
          </a>
        </p>
        <p>
          If the button above does not work, copy and paste the following URL
          into your web browser:
        </p>
        <p>
          <a href={link} style={{ color: '#007bff' }}>
            {link}
          </a>
        </p>
        <p>If you did not sign up for our service, please ignore this email.</p>
        <p>
          Thank you,
          <br />
          The Team
        </p>
      </div>
    </Html>
  )
}
export default EmailVerificationTemplate
