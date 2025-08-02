import { Injectable } from '@nestjs/common'
import { RefreshToken } from '../../domain/models/RefreshToken.model'
import {
    RefreshTokenRepository,
    RefreshTokenRepositoryExceptions,
} from '../../domain/repositories/RefreshToken.repository'
import { RefreshTokenMapper } from '../mappers/RefreshToken.mapper'
import {
    RepositorioExcecao,
    RepositorioSemDadosExcecao,
    ResultadoAssincrono,
    ResultadoUtil,
} from 'http-service-result'
import { RefreshTokenModel } from '../models/RefreshToken.model'

@Injectable()
export class RefreshTokenRepositoryImpl implements RefreshTokenRepository {
    constructor(private readonly refreshTokenMapper: RefreshTokenMapper) {}

    async save(
        refreshToken: RefreshToken,
    ): ResultadoAssincrono<RefreshTokenRepositoryExceptions, void> {
        try {
            const model = this.refreshTokenMapper.domainToModel(refreshToken)
            if (model.ehFalha()) return ResultadoUtil.falha(model.erro)

            await model.valor.save()

            return ResultadoUtil.sucesso()
        } catch (error) {
            console.error('Erro ao salvar refresh token:', error)
            return ResultadoUtil.falha(
                new RepositorioExcecao('Erro ao salvar refresh token'),
            )
        }
    }

    async findByToken(
        token: string,
    ): ResultadoAssincrono<RefreshTokenRepositoryExceptions, RefreshToken> {
        try {
            const model = await RefreshTokenModel.findOne({
                where: { token },
            })
            if (!model) {
                return ResultadoUtil.falha(
                    new RepositorioSemDadosExcecao(
                        'Refresh token não encontrado',
                    ),
                )
            }

            const domain = this.refreshTokenMapper.modelToDomain(model)
            if (domain.ehFalha()) return ResultadoUtil.falha(domain.erro)

            return ResultadoUtil.sucesso(domain.valor)
        } catch (error) {
            console.error('Erro ao buscar refresh token:', error)
            return ResultadoUtil.falha(
                new RepositorioExcecao('Erro ao buscar refresh token'),
            )
        }
    }

    async findByUsuarioId(
        usuarioId: number,
    ): ResultadoAssincrono<RefreshTokenRepositoryExceptions, RefreshToken[]> {
        try {
            const models = await RefreshTokenModel.find({
                where: { usuarioId },
            })
            const domains = this.refreshTokenMapper.modelToDomainList(models)
            if (domains.ehFalha()) {
                return ResultadoUtil.falha(domains.erro)
            }

            return ResultadoUtil.sucesso(domains.valor)
        } catch (error) {
            console.error('Erro ao buscar refresh tokens do usuário:', error)
            return ResultadoUtil.falha(
                new RepositorioExcecao(
                    'Erro ao buscar refresh tokens do usuário',
                ),
            )
        }
    }

    async revogarTodosDoUsuario(
        usuarioId: number,
    ): ResultadoAssincrono<RefreshTokenRepositoryExceptions, void> {
        try {
            const tokensResult = await this.findByUsuarioId(usuarioId)
            if (tokensResult.ehFalha()) {
                return ResultadoUtil.falha(tokensResult.erro)
            }

            const tokensParaRevogar = RefreshToken.revogarTodosAtivos(
                tokensResult.valor,
            )

            if (tokensParaRevogar.length === 0) {
                return ResultadoUtil.sucesso()
            }

            for (const token of tokensParaRevogar) {
                const saveResult = await this.save(token)
                if (saveResult.ehFalha()) {
                    console.error(
                        `Erro ao salvar token revogado:`,
                        saveResult.erro,
                    )
                }
            }

            return ResultadoUtil.sucesso()
        } catch (error) {
            console.error('Erro ao revogar refresh tokens:', error)
            return ResultadoUtil.falha(
                new RepositorioExcecao('Erro ao revogar refresh tokens'),
            )
        }
    }

    async delete(
        id: number,
    ): ResultadoAssincrono<RefreshTokenRepositoryExceptions, void> {
        try {
            await RefreshTokenModel.delete(id)
            return ResultadoUtil.sucesso()
        } catch (error) {
            console.error('Erro ao deletar refresh token:', error)
            return ResultadoUtil.falha(
                new RepositorioExcecao('Erro ao deletar refresh token'),
            )
        }
    }
}
