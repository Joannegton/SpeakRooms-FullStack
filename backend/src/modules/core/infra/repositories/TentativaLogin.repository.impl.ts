import { Injectable } from '@nestjs/common'
import { MoreThan } from 'typeorm'
import { TentativaLogin } from '../../domain/models/TentativaLogin.model'
import {
    ContarTentativasFalhaProps,
    LimparTentativasProps,
    TentativaLoginRepository,
    TentativaLoginRepositoryExceptions,
    ValidarLoginProps,
} from '../../domain/repositories/TentativaLogin.repository'
import { TentativaLoginModel } from '../models/TentativaLogin.model'
import {
    RepositorioExcecao,
    ResultadoAssincrono,
    ResultadoUtil,
    PropriedadesInvalidasExcecao,
} from 'http-service-result'
import { TentativaLoginMapper } from '../mappers/TentativaLogin.mapper'

@Injectable()
export class TentativaLoginRepositoryImpl implements TentativaLoginRepository {
    private readonly MAX_TENTATIVAS_LOGIN = parseInt(
        process.env.MAX_TENTATIVAS_LOGIN || '5',
    )
    private readonly TEMPO_BLOQUEIO_MINUTOS = parseInt(
        process.env.TEMPO_BLOQUEIO_MINUTOS || '10',
    )

    constructor(private readonly tentativaLoginMapper: TentativaLoginMapper) {}

    async registrarTentativaLogin(
        props: TentativaLogin,
    ): ResultadoAssincrono<TentativaLoginRepositoryExceptions, void> {
        try {
            const model = this.tentativaLoginMapper.toModel(props)

            if (model.ehFalha()) {
                return ResultadoUtil.falha(model.erro)
            }

            await model.valor.save()

            return ResultadoUtil.sucesso()
        } catch (error) {
            console.error('Erro ao registrar tentativa de login:', error)
            return ResultadoUtil.falha(
                new RepositorioExcecao(
                    'Erro interno ao registrar tentativa de login',
                ),
            )
        }
    }

    async limparTentativas(
        props: LimparTentativasProps,
    ): ResultadoAssincrono<TentativaLoginRepositoryExceptions, void> {
        try {
            const queryBuilder = TentativaLoginModel.createQueryBuilder()
                .delete()
                .from(TentativaLoginModel)
                .where('sucesso = :sucesso', { sucesso: false })

            if (props.usuarioId && props.ipAddress) {
                queryBuilder.andWhere(
                    '(usuarioId = :usuarioId OR ipAddress = :ipAddress)',
                    {
                        usuarioId: props.usuarioId,
                        ipAddress: props.ipAddress,
                    },
                )
            } else if (props.usuarioId) {
                queryBuilder.andWhere('usuarioId = :usuarioId', {
                    usuarioId: props.usuarioId,
                })
            } else if (props.ipAddress) {
                queryBuilder.andWhere('ipAddress = :ipAddress', {
                    ipAddress: props.ipAddress,
                })
            }

            await queryBuilder.execute()

            return ResultadoUtil.sucesso()
        } catch (error) {
            console.error('Erro ao limpar tentativas de falha:', error)
            return ResultadoUtil.falha(
                new RepositorioExcecao('Erro ao limpar tentativas de falha'),
            )
        }
    }

    async validarTentativaLogin(
        props: ValidarLoginProps,
    ): ResultadoAssincrono<TentativaLoginRepositoryExceptions, void> {
        try {
            const numTentativas = await this.contarTentativasFalhas({
                ipAddress: props.ipAddress,
                usuarioId: props.usuarioId,
                minutosAtras: this.TEMPO_BLOQUEIO_MINUTOS,
            })

            if (numTentativas.ehFalha()) {
                return ResultadoUtil.falha(numTentativas.erro)
            }

            if (numTentativas.valor >= this.MAX_TENTATIVAS_LOGIN) {
                return ResultadoUtil.falha(
                    new PropriedadesInvalidasExcecao(
                        `Bloqueio por ${this.TEMPO_BLOQUEIO_MINUTOS} minutos devido a muitas tentativas de login. Tentativas restantes: 0`,
                    ),
                )
            }

            return ResultadoUtil.sucesso()
        } catch (error) {
            console.error('Erro ao validar tentativa de login:', error)
            return ResultadoUtil.falha(
                new RepositorioExcecao(
                    'Erro interno ao validar tentativa de login',
                ),
            )
        }
    }

    private async contarTentativasFalhas(
        props: ContarTentativasFalhaProps,
    ): ResultadoAssincrono<TentativaLoginRepositoryExceptions, number> {
        let quantidadeTentativas

        if (!props.usuarioId) {
            quantidadeTentativas = await this.contarTentativasFalhasPorIP(
                props.ipAddress,
                props.minutosAtras,
            )
        } else {
            quantidadeTentativas = await this.contarTentativasFalhasPorUsuario(
                props.usuarioId,
                props.minutosAtras,
            )
        }

        if (quantidadeTentativas.ehFalha()) {
            return ResultadoUtil.falha(quantidadeTentativas.erro)
        }

        return ResultadoUtil.sucesso(quantidadeTentativas.valor)
    }

    private async contarTentativasFalhasPorIP(
        ipAddress: string,
        minutosAtras: number,
    ): ResultadoAssincrono<TentativaLoginRepositoryExceptions, number> {
        try {
            const dataLimite = new Date()
            dataLimite.setMinutes(dataLimite.getMinutes() - minutosAtras)

            const count = await TentativaLoginModel.count({
                where: {
                    ipAddress,
                    sucesso: false,
                    tentativaEm: MoreThan(dataLimite),
                },
            })

            return ResultadoUtil.sucesso(count)
        } catch (error) {
            console.error('Erro ao contar tentativas por IP:', error)
            return ResultadoUtil.falha(
                new RepositorioExcecao('Erro ao contar tentativas por IP'),
            )
        }
    }

    private async contarTentativasFalhasPorUsuario(
        usuarioId: number,
        minutosAtras: number,
    ): ResultadoAssincrono<TentativaLoginRepositoryExceptions, number> {
        try {
            const dataLimite = new Date()
            dataLimite.setMinutes(dataLimite.getMinutes() - minutosAtras)

            const count = await TentativaLoginModel.count({
                where: {
                    usuarioId,
                    sucesso: false,
                    tentativaEm: MoreThan(dataLimite),
                },
            })

            return ResultadoUtil.sucesso(count)
        } catch (error) {
            console.error('Erro ao contar tentativas por usuário:', error)
            return ResultadoUtil.falha(
                new RepositorioExcecao('Erro ao contar tentativas por usuário'),
            )
        }
    }
}
