import nodemailer from 'nodemailer'

export interface EmailOptions {
    to: string
    subject: string
    body: string
}

export class EmailService {
    async sendEmail(options: EmailOptions): Promise<void> {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        })

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: options.to,
            subject: options.subject,
            text: options.body,
        }

        try {
            await transporter.sendMail(mailOptions)
            console.log(`E-mail enviado com sucesso para ${options.to}`)
        } catch (error) {
            console.error('Erro ao enviar e-mail:', error)
            throw new Error('Falha ao enviar e-mail')
        }
    }
}
