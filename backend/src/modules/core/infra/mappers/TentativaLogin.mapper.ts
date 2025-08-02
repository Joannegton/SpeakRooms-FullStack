import { Injectable } from '@nestjs/common'
import { TentativaLogin } from '../../domain/models/TentativaLogin.model'
import { TentativaLoginModel } from '../models/TentativaLogin.model'
import {
    PropriedadesInvalidasExcecao,
    Resultado,
    ResultadoUtil,
} from 'http-service-result'

@Injectable()
export class TentativaLoginMapper {
    public toDomain(
        model: TentativaLoginModel,
    ): Resultado<PropriedadesInvalidasExcecao, TentativaLogin> {
        if (!model)
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao('Tentativa de login inválida'),
            )

        const domain = TentativaLogin.carregar(
            {
                ipAddress: model.ipAddress,
                sucesso: model.sucesso,
                userAgent: model.userAgent,
                usuarioId: model.usuarioId,
                motivoFalha: model.motivoFalha,
                tentativaEm: model.tentativaEm,
            },
            model.id,
        )

        if (domain.ehFalha()) {
            return ResultadoUtil.falha(domain.erro)
        }

        return ResultadoUtil.sucesso(domain.valor)
    }

    public toModel(
        domain: TentativaLogin,
    ): Resultado<PropriedadesInvalidasExcecao, TentativaLoginModel> {
        if (!domain)
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao('Tentativa de login inválida'),
            )

        const model = TentativaLoginModel.create({
            sucesso: domain.sucesso,
            motivoFalha: domain.motivoFalha,
            ipAddress: domain.ipAddress,
            userAgent: domain.userAgent,
            usuarioId: domain.usuarioId,
        })

        return ResultadoUtil.sucesso(model)
    }
}
