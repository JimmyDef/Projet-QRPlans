import { object, string } from 'zod'

// Schéma de base : email + password avec restrictions fortes
const baseSchema = object({
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

// Schéma pour le sign-in : on reprend baseSchema (email + password)
export const signInSchema = baseSchema

// Schéma pour la registration : on étend baseSchema
// en ajoutant les champs firstName et lastName obligatoires
export const registrationSchema = baseSchema.extend({
  firstName: string({ required_error: 'First name is required' }).min(
    2,
    'First name must be at least 2 characters'
  ),
  lastName: string({ required_error: 'Last name is required' }).min(
    2,
    'Last name must be at least 2 characters'
  ),
  confirmPassword: string().optional(),
})
