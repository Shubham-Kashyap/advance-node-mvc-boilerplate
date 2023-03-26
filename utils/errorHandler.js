

class ErrorHandler extends Error {

    constructor(message, status = 500) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor)
    }
}

module.exports = ErrorHandler;