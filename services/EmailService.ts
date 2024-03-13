import nodemailer from 'nodemailer';

class EmailService {
    private initTransporter(): any {
        return nodemailer.createTransport({
            service: 'SMTP',
            host: process.env.SMTP_URL,
            port: parseInt(process.env.SMTP_PORT, 10),
            secure: true, // Use `true` for port 465, `false` for all other ports,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_KEY
            },
        });
    }

    async sendResetPasswordEmail(email: string, token: string) {
        // send mail with defined transport object
        const info = await this.initTransporter().sendMail({
            from: 'cocampo503@gmail.com', // sender address
            to: email, // list of receivers
            subject: "Your Password Reset request", // Subject line
            html: `<h1>Password Reset</h1><p>Your reset link is: ${token}</p>`// html body
        });

        console.log("Message sent: %s", info.messageId);
    }

    async sendSuccessResetPasswordEmail(email: string) {
        // send mail with defined transport object
        const info = await this.initTransporter().sendMail({
            from: 'cocampo503@gmail.com', // sender address
            to: email, // list of receivers
            subject: "Your Password Reset request", // Subject line
            html: `<h1>Password Reset</h1><p>Your password has been reset successfully</p>`// html body
        });

        console.log("Message sent: %s", info.messageId);
    }
}

export default EmailService
