import { SessaoAprendizagem } from '../../domain/models/SessaoAprendizagem.model'
import { SessaoAprendizagemModel } from '../models/SessaoAprendizagem.model'
import { Resultado, ResultadoUtil } from 'http-service-result'
import { PropriedadesInvalidasExcecao } from 'http-service-result'

export class SessaoAprendizagemMapper {
    public domainToModel(
        domain: SessaoAprendizagem,
    ): Resultado<PropriedadesInvalidasExcecao, SessaoAprendizagemModel> {
        if (!domain)
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao('Dominio não informado.'),
            )
        const model = SessaoAprendizagemModel.create({
            titulo: domain.titulo,
            descricao: domain.descricao,
            participantes_id: domain.participantes_id,
            dataHoraInicio: domain.dataHoraInicio,
            dataHoraFim: domain.dataHoraFim,
            linkVideo: domain.linkVideo,
            status: domain.status,
            criadorId: domain.criadorId,
        })

        return ResultadoUtil.sucesso(model)
    }

    public modelToDomain(
        model: SessaoAprendizagemModel,
    ): Resultado<PropriedadesInvalidasExcecao, SessaoAprendizagem> {
        if (!model)
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao('Modelo não informado.'),
            )
        const domain = SessaoAprendizagem.carregar({
            criadorId: model.criadorId,
            titulo: model.titulo,
            descricao: model.descricao,
            participantes_id: model.participantes_id,
            dataHoraInicio: model.dataHoraInicio,
            dataHoraFim: model.dataHoraFim,
            linkVideo: model.linkVideo,
            status: model.status,
            id: model.id,
            criadoEm: model.criadoEm,
            atualizadoEm: model.atualizadoEm,
        })

        if (domain.ehFalha()) return ResultadoUtil.falha(domain.erro)

        return ResultadoUtil.sucesso(domain.valor)
    }

    public modelToDomainList(
        modelList: SessaoAprendizagemModel[],
    ): Resultado<PropriedadesInvalidasExcecao, SessaoAprendizagem[]> {
        if (!modelList || modelList.length === 0)
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao('Lista de modelos vazia.'),
            )

        const domainList: SessaoAprendizagem[] = []
        for (const model of modelList) {
            const resultado = this.modelToDomain(model)
            if (resultado.ehFalha()) {
                return ResultadoUtil.falha(resultado.erro)
            }
            domainList.push(resultado.valor)
        }

        return ResultadoUtil.sucesso(domainList)
    }
}
