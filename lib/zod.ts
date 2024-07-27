import { object, string } from 'zod'
export const signInSchema = object({
  email: string({ required_error: 'Email is required' })
    .min(1, 'Email is required')
    .email('Invalid email'),
  password: string({ required_error: 'Password is required' })
    .min(8, 'Password must be between 8 and 20 characters')
    .max(20, 'Password must be between 8 and 20 characters')
    .refine(
      (value) => /[a-z]/.test(value),
      'Password must contain at least one lowercase character (a-z)'
    )
    .refine(
      (value) => /[A-Z]/.test(value),
      'Password must contain at least one uppercase character (A-Z)'
    )
    .refine(
      (value) => /[0-9]/.test(value),
      'Password must contain at least one number (0-9)'
    )
    .refine(
      (value) => /[!@#$%^&*]/.test(value),
      'Password must contain at least one special character (!@#$%^&*)'
    ),
})
