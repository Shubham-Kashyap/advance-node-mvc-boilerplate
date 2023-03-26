const userController = require("../controllers/api/userController");
const { validateRequest } = require("../utils/validator");



module.exports = {
    group: {
        prefix: "/api/v1"
    },
    routes: [
        {
            /** signup route */
            method: "post",
            path: "/signup",
            middleware: validateRequest("signup"),
            handler: userController.signup
        },
        {
            /** login route */
            method: "post",
            path: "/login",
            handler: userController.login
        }
    ]
}