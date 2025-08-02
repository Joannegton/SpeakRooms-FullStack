import { Inject, Injectable } from '@nestjs/common'
import {
    PropriedadesInvalidasExcecao,
    ServicoExcecao,
    ResultadoAssincrono,
    ResultadoUtil,
} from 'http-service-result'
import { AuthRepository } from '../../domain/repositories/Auth.repository'
import { RefreshTokenProps } from '../dtos/RefreshToken.dto'

type LogoutUseCaseExceptions = PropriedadesInvalidasExcecao | ServicoExcecao

@Injectable()
export class LogoutUseCase {
    constructor(
        @Inject('AuthRepository')
        private readonly authRepository: AuthRepository,
    ) {}

    async execute(
        refreshTokenDto: RefreshTokenProps,
    ): ResultadoAssincrono<LogoutUseCaseExceptions, void> {
        const { token: refreshToken } = refreshTokenDto

        if (!refreshToken || refreshToken.trim().length === 0) {
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao('Refresh token é obrigatório'),
            )
        }

        const result =
            await this.authRepository.revogarRefreshToken(refreshToken)
        if (result.ehFalha()) {
            return ResultadoUtil.falha(result.erro)
        }

        return ResultadoUtil.sucesso()
    }
}
