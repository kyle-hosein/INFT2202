class ConflictError extends Error {
    details;
    statusCode = 409;

    constructor(message, details) {
        super(message);
        this.details = details;
        this.name = this.constructor.name;  // Ensures the correct error name
    }
}

module.exports = ConflictError;
