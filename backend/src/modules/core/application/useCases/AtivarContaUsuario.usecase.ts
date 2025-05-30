import { Inject } from '@nestjs/common'
import { UsuarioRepository } from '../../domain/repositories/Usuario.repository'
import { ResultadoAssincrono, ResultadoUtil } from 'http-service-result'
import {
    PropriedadesInvalidasExcecao,
    RepositorioExcecao,
    ServicoExcecao,
} from 'http-service-result'
import { EmailService } from 'src/modules/shared/services/EmailService'

type AtivarContaUsuarioUseCaseExcecao =
    | PropriedadesInvalidasExcecao
    | RepositorioExcecao
    | ServicoExcecao

export class AtivarContaUsuarioUseCase {
    constructor(
        @Inject('UsuarioRepository')
        private readonly usuarioRepository: UsuarioRepository,
        private readonly emailService: EmailService,
    ) {}

    async execute(
        nomeUsuario: string,
    ): ResultadoAssincrono<AtivarContaUsuarioUseCaseExcecao, string> {
        const usuario =
            await this.usuarioRepository.findByUsuarioOrEmail(nomeUsuario)

        if (usuario.ehFalha()) {
            return ResultadoUtil.falha(usuario.erro)
        }

        usuario.valor.ativarContaUsuario()

        const ativarConta = await this.usuarioRepository.save(usuario.valor)
        if (ativarConta.ehFalha()) {
            return ResultadoUtil.falha(ativarConta.erro)
        }

        const enviarEmail = await this.emailService.enviarEmail(
            usuario.valor.email,
            'Ativação de Conta',
            `Olá ${usuario.valor.nomeCompleto}, sua conta foi ativada com sucesso!`,
        )
        if (enviarEmail.ehFalha()) {
            return ResultadoUtil.falha(enviarEmail.erro)
        }

        return ResultadoUtil.sucesso('Conta ativada com sucesso!')
    }
}
