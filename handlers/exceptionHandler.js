const { errorResponse } = require("../utils/response");

class ExceptionHandler extends Error {
    constructor(message, status = 500) {
        super(message);
        this.status = status;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor)
        // return (req, res, next) => {
        //     res.status(status);
        //     errorResponse(res, message)
        // }
    }
}

module.exports = ExceptionHandler;