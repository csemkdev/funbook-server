require("dotenv").config();
const nodemailer = require('nodemailer');

async function sentMail(options) {
    try {

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            service: 'gmail',
            auth: {
                user: 'cse.mkamble@gmail.com',
                pass: 'biutspfyezxpmzot',
            }
        });

        await transporter.sendMail({
            from: 'MAYUR Web Services' + '<cse.mkamble@gmail.com>',
            to: options.to,
            subject: options.subject,
            html: options.text
        }, function (err, info) {
            if (err) {
                console.log('err', err);
            } else {
                console.log('info', info);
            }
        })
    } catch (error) {
        console.log(error)
        return error;
    }
}

module.exports = sentMail;