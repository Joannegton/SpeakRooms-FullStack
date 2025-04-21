import { Module } from '@nestjs/common'
import { EmailService } from './services/EmailService'
import { MailerModule } from '@nestjs-modules/mailer'

@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
                host: process.env.EMAIL_HOST || 'smtp.gmail.com',
                port: Number(process.env.EMAIL_PORT) || 587,
                secure: false,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            },
        }),
    ],
    providers: [EmailService],
    exports: [EmailService],
})
export class SharedModule {}
