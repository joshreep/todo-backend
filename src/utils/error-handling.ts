import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";

export function getStatusCodeFromError(error: unknown) {
    if (error instanceof PrismaClientValidationError) return 400
    if (error instanceof PrismaClientKnownRequestError) return 404
    else return 500
}

export function getErrorMessageFromError(error: unknown) {
    if (error instanceof PrismaClientValidationError) return error.message
    if (error instanceof PrismaClientKnownRequestError) return error.meta?.cause
    else return 'Something went wrong'
}

