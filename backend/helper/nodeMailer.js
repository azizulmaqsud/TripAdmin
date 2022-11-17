const nodemailer = require('nodemailer');

class Mailer {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.NODE_MAILER_SERVER,
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.NODE_MAILER_EMAIL,
                pass: process.env.NODE_MAILER_PASSWORD
            },
        })
    }

    // need to add attachment
    async sendMail(to, subject = 'Hello ✔', html, plainText, attachments) {
        try {
            const info = await this.transporter.sendMail({
                from: `<${process.env.nodemailerEmail}>`,
                to,
                subject,
                text: plainText,
                html,
                attachments,
            });

            return info;
        } catch (e) {
            console.error(e);
            e.name = 'MailerSendError';
            throw e;
        }
    }
}

module.exports = new Mailer();
