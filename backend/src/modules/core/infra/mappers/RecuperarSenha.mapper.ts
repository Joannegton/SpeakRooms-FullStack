import { Resultado, ResultadoUtil } from 'http-service-result'
import { PropriedadesInvalidasExcecao } from 'http-service-result'
import { RecuperarSenha } from '../../domain/models/RecuperarSenha.model'
import { RecuperarSenhaModel } from '../models/RecuperarSenha.model'

export class RecuperarSenhaMapper {
    public modelToDomain(
        model: RecuperarSenhaModel,
    ): Resultado<PropriedadesInvalidasExcecao, RecuperarSenha> {
        if (!model)
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao('Dados não encontrados.'),
            )

        const domain = RecuperarSenha.carregar(
            {
                usuarioId: model.usuario_id,
                token: model.token,
                expiracao: model.expiracao,
                criadoEm: model.criado_em,
                atualizadoEm: model.atualizado_em,
            },
            model.id,
        )
        if (domain.ehFalha()) return ResultadoUtil.falha(domain.erro)
        return ResultadoUtil.sucesso(domain.valor)
    }

    public domainToModel(
        domain: RecuperarSenha,
    ): Resultado<PropriedadesInvalidasExcecao, RecuperarSenhaModel> {
        if (!domain)
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao(
                    'Recuperação de senha inválida.',
                ),
            )

        const model = RecuperarSenhaModel.create({
            usuario_id: domain.usuarioId,
            token: domain.token,
            expiracao: domain.expiracao,
        })

        return ResultadoUtil.sucesso(model)
    }
}
