import { colors } from '@/variables'
import { Html } from '@react-email/components'
import * as React from 'react'

interface PasswordResetProps {
  fullName: string
  link: string
}

const PasswordResetTemplate: React.FC<PasswordResetProps> = ({
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
        <h1 style={{ color: colors.primary }}>Hello, {fullName}</h1>
        <p>We received a request to reset your password.</p>
        <p>You can reset your password by clicking the link below:</p>
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
            Reset Password
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
        <p>
          If you did not request a password reset, please ignore this email or
          contact support if you have questions.
        </p>
        <p>
          Thank you,
          <br />
          The Team
        </p>
      </div>
    </Html>
  )
}

export default PasswordResetTemplate
