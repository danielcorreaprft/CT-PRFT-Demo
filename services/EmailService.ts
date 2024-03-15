import nodemailer from 'nodemailer';

class EmailService {

    fromAddress: string = 'commercetools Test <MS_H0fjnc@trial-351ndgwk0qxgzqx8.mlsender.net>'

    private initTransporter(): any {
        return nodemailer.createTransport({
            host: process.env.SMTP_URL,
            port: parseInt(process.env.SMTP_PORT, 10),
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_KEY
            },
            opportunisticTLS: true,
            connectionTimeout: 2000,
            socketTimeout: 2000,
            greetingTimeout: 2000,
            dnsTimeout: 2000,
            tls: {
                minVersion: 'TLSv1.2',
                rejectUnauthorized: false
            },
            //logger: true,
            //debug: true
        });
    }

    async sendResetPasswordEmail(email: string, token: string) {
        // send mail with defined transport object
        const info = await this.initTransporter().sendMail({
            from: this.fromAddress, // sender address
            to: email, // list of receivers
            subject: "Your Password Reset request", // Subject line
            html: `<h1>Password Reset</h1><p>Your reset link is: ${token}</p>`// html body
        });

        console.log("Message sent: %s", info.messageId);
    }

    async sendSuccessResetPasswordEmail(email: string) {
        // send mail with defined transport object
        const info = await this.initTransporter().sendMail({
            from: this.fromAddress, // sender address
            to: email, // list of receivers
            subject: "Your Password Reset request", // Subject line
            html: `<h1>Password Reset</h1><p>Your password has been reset successfully</p>`// html body
        });

        console.log("Message sent: %s", info.messageId);
    }
}

export default EmailService
