import { ResultadoAssincrono, ResultadoUtil } from 'src/utils/result'
import { UsuarioRepository } from '../../domain/repositories/usuario.repository'
import { PropriedadesInvalidasExcecao } from 'src/utils/exception'
import { EmailService } from '../../infra/services/EmailService'

export class RecuperarSenhaUseCase {
    constructor(
        private usuarioRepositorio: UsuarioRepository,
        private emailService: EmailService,
    ) {}

    async execute(
        usuarioOuEmail: string,
    ): ResultadoAssincrono<PropriedadesInvalidasExcecao, void> {
        const usuario =
            await this.usuarioRepositorio.findByUsuarioOrEmail(usuarioOuEmail)
        if (usuario.ehFalha()) {
            return ResultadoUtil.falha(usuario.erro)
        }

        // Gera um código de 6 dígitos aleatórios
        const tokenRecuperacao = Math.floor(
            100000 + Math.random() * 900000,
        ).toString()

        // Envia o token para o e-mail do usuário
        await this.emailService.sendEmail({
            to: usuario.valor.email,
            subject: 'Recuperação de Senha',
            body: `Use este token para recuperar sua senha: ${tokenRecuperacao}`,
        })

        // Opcional: Salva o token no banco de dados para validação futura
        await this.usuarioRepositorio.salvarCodigoRecuperacaoSenha(
            usuario.valor.id,
            tokenRecuperacao,
        )
    }
}
