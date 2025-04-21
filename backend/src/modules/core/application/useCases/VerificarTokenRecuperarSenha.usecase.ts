import { ResultadoAssincrono, ResultadoUtil } from 'src/utils/result'
import { RecuperarSenhaRepository } from '../../domain/repositories/RecuperarSenha.repository'
import { Inject } from '@nestjs/common'
import {
    PropriedadesInvalidasExcecao,
    RepositorioExcecao,
} from 'src/utils/exception'
import { VerificarTokenRecuperarSenhaDto } from '../dtos/VerificarTokenRecuperarSenha.dto'
import { AuthService } from '../../domain/services/Auth.service'

type RecuperarSenhaRepositoryExceptions =
    | RepositorioExcecao
    | PropriedadesInvalidasExcecao

export class VerificarTokenRecuperarSenhaUseCase {
    constructor(
        @Inject('RecuperarSenhaRepository')
        private readonly recuperarSenhaRepository: RecuperarSenhaRepository,
        @Inject('AuthService')
        private readonly authService: AuthService,
    ) {}

    async execute(
        props: VerificarTokenRecuperarSenhaDto,
    ): ResultadoAssincrono<RecuperarSenhaRepositoryExceptions, string> {
        const result =
            await this.recuperarSenhaRepository.buscarTokenPorIdUsuario(
                props.usuarioId,
            )
        if (result.ehFalha()) {
            return ResultadoUtil.falha(result.erro)
        }

        const verificarToken = result.valor.validarToken(
            props.usuarioId,
            props.token,
        )
        if (verificarToken.ehFalha()) {
            return ResultadoUtil.falha(verificarToken.erro)
        }

        const tokenJwt = await this.authService.gerarJwtMomentaneo(
            props.usuarioId,
        )
        if (tokenJwt.ehFalha()) {
            return ResultadoUtil.falha(tokenJwt.erro)
        }

        return ResultadoUtil.sucesso(tokenJwt.valor)
    }
}
