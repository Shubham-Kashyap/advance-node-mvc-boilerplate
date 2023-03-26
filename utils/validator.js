const { check, validationResult } = require('express-validator');
const { models } = require('../config/db');
const { compareHash } = require('../services/crypto');
const { errorResponse } = require('./response');
const messages = require('../constants/messages');

const validateResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return errorResponse(res, errors.array()[0].msg);
    } else {
        next();
    }

}

const validateRules = (method) => {
    // console.log(method)
    switch (method) {

        /**
         * -------------------------------------------------------------------------------
         * Signup validation rules
         * -------------------------------------------------------------------------------
         */
        case 'signup': {
            // console.log("======== signup ==========")
            return [
                check('fullname')
                    .notEmpty().withMessage('fullname field is required').bail(),
                check('email')
                    .notEmpty().withMessage('Email field is required').bail()
                    .exists().withMessage("Email should not be empty").bail()
                    .isEmail().withMessage("Email sholud be a valid email").bail()
                    .custom(async (value) => {
                        const data = await models.User.findOne({ where: { email: value } });
                        if (data) {
                            return Promise.reject('Email already in use');
                        }
                    }).bail(),
                check('phone_no')
                    .isNumeric().withMessage("Phone number must be numeric").bail()
                    .custom(async (value) => {
                        const data = await models.User.findOne({ where: { phone_no: value } });
                        if (data) {
                            return Promise.reject('Phone number is already in use');
                        }
                    }).bail(),
                check('password')
                    .notEmpty().withMessage('Password field is required').bail()
                    .exists().withMessage("Password should not be empty").bail(),
            ];

            return rules;
        }


        /**
         * -------------------------------------------------------------------------------------
         * Login validation rules
         * -------------------------------------------------------------------------------------
         */
        case 'login': {
            console.log("===== login ======")
            return [
                check('email')
                    .notEmpty().withMessage(messages.LOGIN_EMAIL_FIELD_REQUIRED_MESSAGE).bail()
                    .exists().withMessage(messages.LOGIN_EMAIL_FIELD_NOT_EMPTY_MESSAGE).bail()
                    .custom(async (value) => {
                        const data = await models.User.findOne({ where: { email: value } });
                        if (!data) {
                            return Promise.reject(messages.LOGIN_INVALID_EMAIL_MESSAGE);
                        }
                    }).bail(),
                check('password')
                    .notEmpty().withMessage('Password field is required').bail()
                    .exists().withMessage("Password should not be empty").bail(),
                check('password').custom(async (value, { req }) => {
                    const user = await models.User.findOne({ where: { email: req.body.email } });
                    const is_valid = await compareHash(req.body.password, user?.password);
                    if (!is_valid) {
                        return Promise.reject('Incorrect password');
                    }
                }),
            ]

            return rules;
        }

        /**
         *  -------------------------------------------------------------------------------------
         * Fetch profile validation rules 
         *  -------------------------------------------------------------------------------------
         */
        case 'fetch-profile': {
            console.log("============ fetch profile ===============")
            return [];
        }


        /**
         * -------------------------------------------------------------------------------------
         * Default validation rule
         * -------------------------------------------------------------------------------------
         */
        default: {
            console.log("===== default rule ======");
            return [];
        }
    }
}




module.exports = {
    validateRequest: (method) => [
        validateRules(method),
        validateResult
    ],
}