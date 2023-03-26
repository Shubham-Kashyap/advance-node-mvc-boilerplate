const nodemailer = require('nodemailer');
require('dotenv').config();

module.exports = {
    connetion: process.env.MAIL_CONNECTION || 'smtp',
    from: process.env.MAIL_FROM,



    smtp: nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
        }
    }),


    sendMail: async (sendTo, data) => {
        const sendedMail = module.exports.smtp.sendMail({
            from: module.exports.from,
            to: sendTo,
            subject: "Message title",
            text: "Plaintext version of the message", /**optional   */
            html: html
        });

        console.log("Mail is sended successfully : %s", sendedMail.messageId);

    }
}