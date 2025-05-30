import { ResultadoAssincrono, ResultadoUtil } from 'http-service-result'
import { SessaoAprendizagem } from '../../domain/models/SessaoAprendizagem.model'
import {
    SessaoAprendizagemRepository,
    SessaoAprendizagemRepositoryExceptions,
} from '../../domain/repositories/SessaoAprendizagem.repository'
import { SessaoAprendizagemMapper } from '../mappers/SessaoAprendizagem.mapper'
import { SessaoAprendizagemModel } from '../models/SessaoAprendizagem.model'
import { RepositorioSemDadosExcecao } from 'http-service-result'
import { Injectable } from '@nestjs/common'

@Injectable()
export class SessaoAprendizagemRepositoryImpl
    implements SessaoAprendizagemRepository
{
    constructor(
        private readonly sessaoAprendizagemMapper: SessaoAprendizagemMapper,
    ) {}

    async save(
        sessao: SessaoAprendizagem,
    ): ResultadoAssincrono<SessaoAprendizagemRepositoryExceptions, void> {
        const model = this.sessaoAprendizagemMapper.domainToModel(sessao)
        if (model.ehFalha()) return ResultadoUtil.falha(model.erro)

        const salvar = await model.valor.save()

        if (!salvar)
            return ResultadoUtil.falha(
                new RepositorioSemDadosExcecao('Erro ao salvar Sessão'),
            )

        return ResultadoUtil.sucesso()
    }

    async findById(
        idSessao: number,
    ): ResultadoAssincrono<
        SessaoAprendizagemRepositoryExceptions,
        SessaoAprendizagem
    > {
        const sessao = await SessaoAprendizagemModel.findOne({
            where: { id: idSessao },
            relations: ['participantes', 'criador'],
        })

        if (!sessao)
            return ResultadoUtil.falha(
                new RepositorioSemDadosExcecao('Sessão não encontrada'),
            )

        const domain = this.sessaoAprendizagemMapper.modelToDomain(sessao)
        if (domain.ehFalha()) return ResultadoUtil.falha(domain.erro)

        return ResultadoUtil.sucesso(domain.valor)
    }

    async findAll(): ResultadoAssincrono<
        SessaoAprendizagemRepositoryExceptions,
        SessaoAprendizagem[]
    > {
        const sessoes = await SessaoAprendizagemModel.find({
            relations: ['participantes', 'criador'],
        })

        if (!sessoes) {
            return ResultadoUtil.falha(
                new RepositorioSemDadosExcecao('Nenhuma sessão encontrada'),
            )
        }

        const sessoesDomain =
            this.sessaoAprendizagemMapper.modelToDomainList(sessoes)
        if (sessoesDomain.ehFalha()) {
            return ResultadoUtil.falha(sessoesDomain.erro)
        }

        return ResultadoUtil.sucesso(sessoesDomain.valor)
    }

    async delete(
        idSessao: number,
        idUsuario: number,
    ): ResultadoAssincrono<SessaoAprendizagemRepositoryExceptions, void> {
        const result = await SessaoAprendizagemModel.delete({
            id: idSessao,
            criadorId: idUsuario,
        })

        if (!result.affected || result.affected === 0)
            return ResultadoUtil.falha(
                new RepositorioSemDadosExcecao('Sessão não encontrada'),
            )

        ResultadoUtil.sucesso()
    }

    update(
        idSessao: number,
        sessao: SessaoAprendizagem,
    ): ResultadoAssincrono<
        SessaoAprendizagemRepositoryExceptions,
        SessaoAprendizagem
    > {
        throw new Error('Method not implemented.')
    }
}
