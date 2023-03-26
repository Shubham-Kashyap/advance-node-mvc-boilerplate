const { successResponse } = require("../../utils/response");
const errorException = require('../../handlers/exceptionHandler')

class userController {
    /**
     * --------------------------------------------------------------------
     * Sign up
     * --------------------------------------------------------------------
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    signup = (req, res) => {
        return res.status(200).send({
            message: "ok"
        });
    }


    /**
     * -------------------------------------------------------------------
     * Login
     * -------------------------------------------------------------------
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    login = async (req, res) => {
        const { email, password } = req.body;

        // throw new Error('An error happened');
        throw new errorException('inacnaks sadasd asdjkajsd asjkd')
        return successResponse(res, 'login successfull .',)
    }
}

module.exports = new userController();