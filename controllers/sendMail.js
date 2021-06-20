const nodemailer = require('nodemailer');
const env = require('dotenv');
env.config();

module.exports = function (email, name) {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'my0548448296@gmail.com',
            pass: process.env.PASSWORD
        }
    });

    let mailOptions = {
        from: 'my0548448296@gmail.com',
        to: email,
        subject: 'wellcome',
        text: `hello ${name}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
