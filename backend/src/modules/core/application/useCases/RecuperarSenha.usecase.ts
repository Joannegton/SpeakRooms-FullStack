import { ResultadoAssincrono, ResultadoUtil } from 'http-service-result'
import { PropriedadesInvalidasExcecao } from 'http-service-result'
//import { EmailService } from '../../infra/services/EmailService'
import { RecuperarSenhaRepository } from '../../domain/repositories/RecuperarSenha.repository'
import { UsuarioRepository } from '../../domain/repositories/Usuario.repository'
import { Inject } from '@nestjs/common'
import { RecuperarSenhaMapperApplication } from '../mappers/RecuperarSenha.mapper'

export class RecuperarSenhaUseCase {
    constructor(
        @Inject('RecuperarSenhaRepository')
        private recuperarSenhaRepositorio: RecuperarSenhaRepository,
        @Inject('UsuarioRepository')
        private usuarioSenhaRepositorio: UsuarioRepository,
        private readonly recuperarSenhaMapper: RecuperarSenhaMapperApplication,
        //private emailService: EmailService,
    ) {}

    async execute(
        usuarioOuEmail: string,
    ): ResultadoAssincrono<PropriedadesInvalidasExcecao, void> {
        const usuario =
            await this.usuarioSenhaRepositorio.findByUsuarioOrEmail(
                usuarioOuEmail,
            )
        if (usuario.ehFalha()) {
            return ResultadoUtil.falha(usuario.erro)
        }

        const domain = this.recuperarSenhaMapper.toDomain(usuario.valor.id)
        if (domain.ehFalha()) return ResultadoUtil.falha(domain.erro)

        const instancia = await this.recuperarSenhaRepositorio.salvar(
            domain.valor,
        )
        if (instancia.ehFalha()) {
            console.log('erro aqui22', instancia.erro)
            return ResultadoUtil.falha(instancia.erro)
        }

        return ResultadoUtil.sucesso()
    }
}
