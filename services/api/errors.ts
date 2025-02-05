export enum ApiErrorCode {
    // Authentication errors
    UNAUTHORIZED = "UNAUTHORIZED",
    INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
    TOKEN_EXPIRED = "TOKEN_EXPIRED",

    // Resource errors
    NOT_FOUND = "NOT_FOUND",
    FORBIDDEN = "FORBIDDEN",

    // Request errors
    BAD_REQUEST = "BAD_REQUEST",
    VALIDATION_ERROR = "VALIDATION_ERROR",

    // Server errors
    INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
    SERVICE_UNAVAILABLE = "SERVICE_UNAVAILABLE",

    // Generic error
    UNKNOWN_ERROR = "UNKNOWN_ERROR",
    RECIPE_ALREADY_EXISTS = "RECIPE_ALREADY_EXISTS",
    RECIPE_NOT_FOUND = "RECIPE_NOT_FOUND",
    MAX_RECIPE_LIMIT_REACHED = "50001",
    MAX_RECIPE_LIMIT_REACHED_PRO = "50002",
}

export interface ApiError {
    code: ApiErrorCode;
    message: string;
    details?: Record<string, unknown>;
}
