import { ResultadoAssincrono, ResultadoUtil } from 'http-service-result'
import { RecuperarSenha } from '../../domain/models/RecuperarSenha.model'
import {
    RecuperarSenhaRepository,
    RecuperarSenhaRepositoryExceptions,
} from '../../domain/repositories/RecuperarSenha.repository'
import {
    RepositorioExcecao,
    RepositorioSemDadosExcecao,
} from 'http-service-result'
import { RecuperarSenhaMapper } from '../mappers/RecuperarSenha.mapper'
import { RecuperarSenhaModel } from '../models/RecuperarSenha.model'
import { Injectable } from '@nestjs/common'

@Injectable()
export class RecuperarSenhaRepositoryImpl implements RecuperarSenhaRepository {
    constructor(private readonly recuperarSenhaMapper: RecuperarSenhaMapper) {}
    async salvar(
        recuperarSenha: RecuperarSenha,
    ): ResultadoAssincrono<RecuperarSenhaRepositoryExceptions, string> {
        try {
            const modelExistente = await RecuperarSenhaModel.findOne({
                where: { usuario_id: recuperarSenha.usuarioId },
            })

            if (modelExistente) {
                modelExistente.token = recuperarSenha.token
                modelExistente.expiracao = recuperarSenha.expiracao
                await modelExistente.save()
                return ResultadoUtil.sucesso(recuperarSenha.token)
            }

            const model =
                this.recuperarSenhaMapper.domainToModel(recuperarSenha)
            if (model.ehFalha()) return ResultadoUtil.falha(model.erro)

            await model.valor.save()
            return ResultadoUtil.sucesso(model.valor.token)
        } catch (error) {
            console.error('Erro ao salvar ou atualizar token', error)
            return ResultadoUtil.falha(
                new RepositorioExcecao('Erro ao salvar ou atualizar token'),
            )
        }
    }

    async buscarTokenPorIdUsuario(
        idUsuario: number,
    ): ResultadoAssincrono<RecuperarSenhaRepositoryExceptions, RecuperarSenha> {
        try {
            const model = await RecuperarSenhaModel.findOne({
                where: { usuario_id: idUsuario },
            })
            if (!model)
                return ResultadoUtil.falha(
                    new RepositorioSemDadosExcecao('Nenhum token encontrado'),
                )

            const recuperarSenha =
                this.recuperarSenhaMapper.modelToDomain(model)
            if (recuperarSenha.ehFalha())
                return ResultadoUtil.falha(recuperarSenha.erro)

            return ResultadoUtil.sucesso(recuperarSenha.valor)
        } catch (error) {
            console.error('Erro ao buscar token', error)
            return ResultadoUtil.falha(
                new RepositorioExcecao('Erro ao buscar token'),
            )
        }
    }
}
