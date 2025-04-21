import { SessaoAprendizagem } from '../../domain/models/SessaoAprendizagem.model'
import { SessaoAprendizagemModel } from '../models/SessaoAprendizagem.model'
import { Resultado, ResultadoUtil } from 'src/utils/result'
import { PropriedadesInvalidasExcecao } from 'src/utils/exception'

export class SessaoAprendizagemMapper {
    domainToModel(
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
        })

        return ResultadoUtil.sucesso(model)
    }

    modelToDomain(
        model: SessaoAprendizagemModel,
    ): Resultado<PropriedadesInvalidasExcecao, SessaoAprendizagem> {
        if (!model)
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao('Modelo não informado.'),
            )
        const domain = SessaoAprendizagem.carregar({
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
}
