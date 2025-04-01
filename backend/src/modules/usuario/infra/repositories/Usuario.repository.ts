import { ResultadoUtil, ResultadoAssincrono } from 'src/utils/result'
import { Usuario } from '../../domain/models/usuario.model'
import {
    UsuarioRepository,
    UsuarioRepositoryExceptions,
} from '../../domain/repositories/usuario.repository'
import { UsuarioMapper } from '../mappers/Usuario.mapper'
import { RepositorioExcecao } from 'src/utils/exception'
import { Injectable } from '@nestjs/common'
import { UsuarioModel } from '../models/Usuario.model'

@Injectable()
export class UsuarioRepositoryImpl implements UsuarioRepository {
    constructor(private readonly usuarioMapper: UsuarioMapper) {}

    async save(
        usuario: Usuario,
    ): ResultadoAssincrono<UsuarioRepositoryExceptions, void> {
        try {
            const model = this.usuarioMapper.domainToModel(usuario)
            if (model.ehFalha()) return ResultadoUtil.falha(model.erro)

            await model.valor.save()
            return ResultadoUtil.sucesso()
        } catch (error) {
            return ResultadoUtil.falha(new RepositorioExcecao(error))
        }
    }

    async findByUsuarioOrEmail(
        usuarioOuEmail: string,
    ): ResultadoAssincrono<UsuarioRepositoryExceptions, Usuario> {
        try {
            const model = await UsuarioModel.findOne({
                where: [
                    { email: usuarioOuEmail },
                    { nome_usuario: usuarioOuEmail },
                ],
            })

            if (!model) {
                return ResultadoUtil.falha(
                    new RepositorioExcecao('Usuário não encontrado'),
                )
            }

            const usuario = this.usuarioMapper.modelToDomain(model)
            if (usuario.ehFalha()) return ResultadoUtil.falha(usuario.erro)

            return ResultadoUtil.sucesso(usuario.valor)
        } catch (error) {
            return ResultadoUtil.falha(new RepositorioExcecao(error))
        }
    }

    findById(
        id: string,
    ): ResultadoAssincrono<UsuarioRepositoryExceptions, Usuario> {
        throw new Error(`Method not implemented.${id}`)
    }
    delete(id: string): ResultadoAssincrono<UsuarioRepositoryExceptions, void> {
        throw new Error(`Method not implemented.${id}`)
    }
    update(
        usuario: Usuario,
    ): ResultadoAssincrono<UsuarioRepositoryExceptions, void> {
        throw new Error(`Method not implemented.${usuario}`)
    }
    findAll(): ResultadoAssincrono<UsuarioRepositoryExceptions, Usuario[]> {
        throw new Error(`Method not implemented.`)
    }
}
