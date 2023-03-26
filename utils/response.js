

class Response {
    errorResponse = (res, message, data = null) => {
        return res.send({
            status: true,
            force_logout: '0',
            message: message,
            response: data
        });
    }
    successResponse = (res, message, data = null) => {
        return res.send({
            status: true,
            force_logout: '0',
            message: message,
            response: data
        });
    }
    forceLogoutResponse = (res, message, data = null) => {
        return res.send({
            status: true,
            force_logout: '1',
            message: message,
            response: data
        });
    }

}


const obj = new Response();

exports.successResponse = obj.successResponse;
exports.errorResponse = obj.errorResponse;
exports.forceLogoutResponse = obj.forceLogoutResponse;