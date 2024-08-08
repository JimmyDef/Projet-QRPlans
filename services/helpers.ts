export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export const removeChevronCharacters = (input: string) => {
  return input.replace(/[<>]/g, '')
}

export const removeNonAlphabeticCharacters = (input: string) => {
  return input.replace(/[^a-zA-Z]/g, '')
}
export const sanitizeInput = (input: string) => {
  return input.replace(/[^a-zA-ZÀ-ÖØ-öø-ÿ-' ]/g, '')
}
