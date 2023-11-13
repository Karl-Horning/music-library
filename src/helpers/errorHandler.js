/**
 * Custom error class that extends the standard Error class.
 * @class
 */
class CustomError extends Error {
    /**
     * Creates an instance of CustomError.
     * @param {string} message - The error message.
     * @param {number} [statusCode] - The HTTP status code associated with the error.
     */
    constructor(message, statusCode) {
        super(message);
        /**
         * The HTTP status code associated with the error.
         * @type {number}
         */
        this.statusCode = statusCode;
    }
}

/**
 * Handles errors by logging them and throwing a custom error.
 * @param {Error} error - The original error object.
 * @param {string} customMessage - A custom error message to log.
 * @param {number} [statusCode] - The HTTP status code for the custom error. Defaults to 500 if not provided.
 * @throws {CustomError} Throws a custom error with the specified message and status code.
 */
const handleError = (error, customMessage, statusCode) => {
    console.error(customMessage, error);
    throw new CustomError(customMessage, statusCode || 500);
};

module.exports = { CustomError, handleError };
