import crypto from 'crypto'

export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export const removeChevronCharacters = (input: string) => {
  return input.replace(/[<>]/g, '')
}

export const removeNonAlphabeticCharacters = (input: string) => {
  return input.replace(/[^a-zA-Z]/g, '')
}
export const sanitizeNameInput = (input: string) => {
  return input.replace(/[^a-zA-ZÀ-ÖØ-öø-ÿ-' ]/g, '')
}
export const sanitizeFoldersInput = (input: string) => {
  return input.replace(/[^a-zA-ZÀ-ÖØ-öø-ÿ0-9-' ]/g, '')
}
export const sanitizeEmailInput = (email: string) => {
  const forbiddenCharacters = /[(),:;<>[\]\\\s]/g // Supprime espaces, tabulations, etc.
  return email.trim().replace(forbiddenCharacters, '').toLowerCase()
}
export const sanitizePasswordInput = (password: string) => {
  const forbiddenCharacters = /[<>]/g
  const sanitized = password.replace(forbiddenCharacters, '')
  password.replace(forbiddenCharacters, '')
  return sanitized.replace(/\s+/g, '')
}

/** -----------------------------------------------------
 * Checks if the given password is strong based on several criteria.
 *
 * A strong password must:
 * - Contain at least one lowercase letter
 * - Contain at least one uppercase letter
 * - Contain at least one number
 * - Contain at least one special character
 * - Have a valid length
 *
 * @param password - The password string to be checked.
 * @returns `true` if the password meets all the criteria, otherwise `false`.
 */
export const isPasswordStrong = (password: string) => {
  return (
    hasLowercase(password) &&
    hasUppercase(password) &&
    hasNumber(password) &&
    hasSpecialCharacter(password) &&
    isPasswordLengthValid(password)
  )
}
export const hasLowercase = (password: string) => /[a-z]/.test(password)
export const hasUppercase = (password: string) => /[A-Z]/.test(password)
export const hasNumber = (password: string) => /\d/.test(password)
export const hasSpecialCharacter = (password: string) =>
  /[!@#$%^&*]/.test(password)
export const isPasswordLengthValid = (password: string) =>
  password.length >= 8 && password.length <= 20
// -----------------------------------------------------
// -----------------------------------------------------

export const escapeRegExp = (string: string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export const generateUniqueFolderName = (
  baseName: string,
  similarFolders: {
    name: string
  }[]
) => {
  const existingNames = similarFolders.map((folder) => folder.name)
  const escapedBaseName = escapeRegExp(baseName)
  let uniqueName = baseName
  let suffix = 1

  if (existingNames.includes(uniqueName)) {
    const regex = new RegExp(`^${escapedBaseName}( \\((\\d+)\\))?$`)
    const suffixes = existingNames
      .map((n) => {
        const match = n.match(regex)
        return match && match[2] ? parseInt(match[2], 10) : 0
      })
      .filter((n) => n >= 1)

    suffix = suffixes.length > 0 ? Math.max(...suffixes) + 1 : 1
    uniqueName = `${baseName} (${suffix})`
  }

  return uniqueName
}

export const isNum = (key: string) => {
  return /^[0-9]$/.test(key)
}

export const generateOTP = () => {
  return crypto.randomInt(100000, 1000000).toString()
}
