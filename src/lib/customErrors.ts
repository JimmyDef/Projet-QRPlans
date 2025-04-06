import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library'

export class AppError extends Error {
  statusCode?: number
  constructor(message: string, statusCode?: number) {
    super(message)
    this.statusCode = statusCode
  }
}

export const isPrismaError = (error: unknown) => {
  return (
    error instanceof PrismaClientInitializationError ||
    error instanceof PrismaClientValidationError ||
    error instanceof PrismaClientKnownRequestError ||
    error instanceof PrismaClientRustPanicError ||
    error instanceof PrismaClientUnknownRequestError
  )
}

export const handleErrorResponseForActions = (
  error: unknown,
  defaultMessage = 'Unexpected error occurred, please try again.'
) => {
  if (isPrismaError(error)) {
    throw new AppError('Database unavailable, try again later.')
  }
  if (error instanceof AppError) {
    throw new Error(error.message)
  }
  throw new Error(defaultMessage)
}
