import { config } from 'dotenv'
import { Injectable } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'
import { ResultadoAssincrono, ResultadoUtil } from 'http-service-result'
import { ServicoExcecao } from 'http-service-result'

config()

export interface EmailOptions {
    to: string
    subject: string
    mensagem: string
}

@Injectable()
export class EmailService {
    constructor(private readonly mailService: MailerService) {}
    async enviarEmail(
        para: string,
        assunto: string,
        mensagem: string,
    ): ResultadoAssincrono<ServicoExcecao, string> {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: para,
            subject: assunto,
            text: mensagem,
        }

        const enviarEmail = await this.mailService.sendMail(mailOptions)
        if (enviarEmail.rejected.length > 0) {
            return ResultadoUtil.falha(
                new ServicoExcecao('Falha ao enviar e-mail'),
            )
        }

        return ResultadoUtil.sucesso(`E-mail enviado com sucesso para ${para}`)
    }
}
