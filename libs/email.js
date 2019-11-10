const nodemailer = require('nodemailer');
let {service, host, port, secure, username, password} = require('../config.json').mail;

let transporter;

transporter = nodemailer.createTransport({
    host,
    service,
    port,
    secure,
    auth: {
        user: username,
        pass: password
    }
});

async function sendEmail(to, message) {
    try {
        await transporter.sendMail({
            from: username,
            to: to,
            subject: "Загрузка изображения",
            text: message,
            
        });
    } catch(err) {
        console.log('Ошибка при отправке email.')
    }
}

module.exports = {
    sendEmail
}