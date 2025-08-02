import { Injectable } from '@nestjs/common'
import { RefreshToken } from '../../domain/models/RefreshToken.model'
import { RefreshTokenModel } from '../models/RefreshToken.model'
import {
    PropriedadesInvalidasExcecao,
    Resultado,
    ResultadoUtil,
} from 'http-service-result'

@Injectable()
export class RefreshTokenMapper {
    public domainToModel(
        domain: RefreshToken,
    ): Resultado<PropriedadesInvalidasExcecao, RefreshTokenModel> {
        if (!domain)
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao(
                    'RefreshToken não pode ser nulo',
                ),
            )

        const model = RefreshTokenModel.create({
            token: domain.token,
            hasId: domain.id,
            revogado: domain.revogado,
            id: domain.id,
            ipAddress: domain.ipAddress,
            usuarioId: domain.usuarioId,
            expiresAt: domain.expiresAt,
            deviceInfo: domain.deviceInfo,
            updatedAt: domain.updatedAt,
            createdAt: domain.createdAt,
        })

        return ResultadoUtil.sucesso(model)
    }

    public modelToDomain(
        model: RefreshTokenModel,
    ): Resultado<PropriedadesInvalidasExcecao, RefreshToken> {
        if (!model) {
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao(
                    'RefreshTokenModel não pode ser nulo',
                ),
            )
        }

        const domain = RefreshToken.carregar(
            {
                token: model.token,
                usuarioId: model.usuarioId,
                expiresAt: model.expiresAt,
                createdAt: model.createdAt,
                updatedAt: model.updatedAt,
                revogado: model.revogado,
                ipAddress: model.ipAddress,
                deviceInfo: model.deviceInfo,
            },
            model.id,
        )
        if (domain.ehFalha()) {
            return ResultadoUtil.falha(domain.erro)
        }

        return ResultadoUtil.sucesso(domain.valor)
    }

    public modelToDomainList(
        models: RefreshTokenModel[],
    ): Resultado<PropriedadesInvalidasExcecao, RefreshToken[]> {
        if (!models) {
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao('Model não pode ser nulo'),
            )
        }

        const domains: RefreshToken[] = []
        for (const model of models) {
            const domain = this.modelToDomain(model)
            if (domain.ehFalha()) {
                console.error(
                    'Erro ao mapear RefreshTokenModel para RefreshToken:',
                    domain.erro,
                )
                continue
            }
            domains.push(domain.valor)
        }

        return ResultadoUtil.sucesso(domains)
    }
}
