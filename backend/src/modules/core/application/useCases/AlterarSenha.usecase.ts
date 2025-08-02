import { Inject } from '@nestjs/common'
import {
    RecuperarSenhaRepository,
    RecuperarSenhaRepositoryExceptions,
} from '../../domain/repositories/RecuperarSenha.repository'
import { AlterarSenhaDto } from '../dtos/AlterarSenha.dto'
import { ResultadoAssincrono, ResultadoUtil } from 'http-service-result'
import { UsuarioRepository } from '../../domain/repositories/Usuario.repository'
import { HashService } from '../../domain/services/Hash.service'

export class AlterarSenhaUseCase {
    constructor(
        @Inject('RecuperarSenhaRepository')
        private readonly recuperarSenhaRepository: RecuperarSenhaRepository,
        @Inject('UsuarioRepository')
        private readonly usuarioRepository: UsuarioRepository,
        @Inject('HashService')
        private readonly hashService: HashService,
    ) {}

    async execute(
        props: AlterarSenhaDto,
    ): ResultadoAssincrono<RecuperarSenhaRepositoryExceptions, void> {
        const usuarioResult = await this.usuarioRepository.findById(
            props.usuarioId,
        )
        if (usuarioResult.ehFalha()) {
            return ResultadoUtil.falha(usuarioResult.erro)
        }

        const verificarSenha = usuarioResult.valor.validarSenha(props.senha)
        if (verificarSenha.ehFalha()) {
            return ResultadoUtil.falha(verificarSenha.erro)
        }

        const hashedPassword = await this.hashService.hashPassword(props.senha)

        const alterarSenhaResult =
            usuarioResult.valor.alterarSenhaComHash(hashedPassword)
        if (alterarSenhaResult.ehFalha()) {
            return ResultadoUtil.falha(alterarSenhaResult.erro)
        }

        const saveResult = await this.usuarioRepository.save(
            usuarioResult.valor,
        )
        if (saveResult.ehFalha()) {
            return ResultadoUtil.falha(saveResult.erro)
        }

        return ResultadoUtil.sucesso()
    }
}
