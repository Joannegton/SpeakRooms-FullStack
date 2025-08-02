import { Inject, Injectable } from '@nestjs/common'
import {
    PropriedadesInvalidasExcecao,
    RepositorioExcecao,
    ServicoExcecao,
    ResultadoAssincrono,
    ResultadoUtil,
} from 'http-service-result'
import { AuthRepository } from '../../domain/repositories/Auth.repository'
import { RefreshTokenProps, RefreshTokenDto } from '../dtos/RefreshToken.dto'

type RenovarTokenUseCaseExceptions =
    | PropriedadesInvalidasExcecao
    | ServicoExcecao
    | RepositorioExcecao

@Injectable()
export class RenovarTokenUseCase {
    constructor(
        @Inject('AuthRepository')
        private readonly authRepository: AuthRepository,
    ) {}

    async execute(
        props: RefreshTokenProps,
    ): ResultadoAssincrono<RenovarTokenUseCaseExceptions, RefreshTokenDto> {
        if (!props.token || props.token.trim().length === 0) {
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao('Refresh token é obrigatório'),
            )
        }

        const result = await this.authRepository.renovarToken(props.token)
        if (result.ehFalha()) {
            return ResultadoUtil.falha(result.erro)
        }

        return ResultadoUtil.sucesso({
            accessToken: result.valor.access_token,
            refreshToken: result.valor.refresh_token,
            nome_usuario: result.valor.nome_usuario,
        })
    }
}
