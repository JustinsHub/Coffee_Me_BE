"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.ErrorNotFound = exports.ErrorNotAuthorized = exports.ErrorBadRequest = exports.ExpressError = void 0;
class ExpressError extends Error {
    constructor(message, status) {
        super(message);
        this.message = message;
        this.status = status;
        console.error(this.stack);
    }
}
exports.ExpressError = ExpressError;
class ErrorBadRequest extends ExpressError {
    constructor(message = "Bad Request") {
        super(message, 400);
    }
}
exports.ErrorBadRequest = ErrorBadRequest;
class ErrorNotAuthorized extends ExpressError {
    constructor(message = "Not Authorized") {
        super(message, 401);
    }
}
exports.ErrorNotAuthorized = ErrorNotAuthorized;
class ErrorNotFound extends ExpressError {
    constructor(message = "Not Found") {
        super(message, 404);
    }
}
exports.ErrorNotFound = ErrorNotFound;
const errorHandler = (error, req, res, next) => {
    let status = error.status || 500;
    let message = error.message;
    return res.status(status).json({
        error: {
            message,
            status
        }
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=expressErrors.js.map