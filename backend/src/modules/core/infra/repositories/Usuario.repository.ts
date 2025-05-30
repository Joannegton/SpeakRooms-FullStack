import {
    ResultadoUtil,
    ResultadoAssincrono,
    RepositorioExcecao,
    RepositorioSemDadosExcecao,
} from 'http-service-result'
import { Usuario } from '../../domain/models/Usuario.model'
import {
    UsuarioRepository,
    UsuarioRepositoryExceptions,
} from '../../domain/repositories/Usuario.repository'
import { UsuarioMapper } from '../mappers/Usuario.mapper'
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
            console.error('Erro ao salvar usuário:', error)
            return ResultadoUtil.falha(
                new RepositorioExcecao('Erro ao salvar usuário'),
            )
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
                    new RepositorioSemDadosExcecao('Usuário não encontrado'),
                )
            }

            const usuario = this.usuarioMapper.modelToDomain(model)
            if (usuario.ehFalha()) return ResultadoUtil.falha(usuario.erro)

            return ResultadoUtil.sucesso(usuario.valor)
        } catch (error) {
            console.error('Erro ao buscar usuário:', error)
            return ResultadoUtil.falha(
                new RepositorioExcecao('Erro ao buscar usuário'),
            )
        }
    }

    async findById(
        id: number,
    ): ResultadoAssincrono<UsuarioRepositoryExceptions, Usuario> {
        try {
            const model = await UsuarioModel.findOne({
                where: { usuario_id: id },
            })

            if (!model) {
                return ResultadoUtil.falha(
                    new RepositorioSemDadosExcecao('Usuário não encontrado'),
                )
            }

            const usuario = this.usuarioMapper.modelToDomain(model)
            if (usuario.ehFalha()) return ResultadoUtil.falha(usuario.erro)

            return ResultadoUtil.sucesso(usuario.valor)
        } catch (error) {
            return ResultadoUtil.falha(new RepositorioExcecao(error))
        }
    }

    async delete(
        nomeUsuario: string,
    ): ResultadoAssincrono<UsuarioRepositoryExceptions, void> {
        try {
            const result = await UsuarioModel.delete({
                nome_usuario: nomeUsuario,
            })
            if (result.affected === 0) {
                return ResultadoUtil.falha(
                    new RepositorioSemDadosExcecao(
                        'Usuário não encontrado para exclusão',
                    ),
                )
            }
            return ResultadoUtil.sucesso()
        } catch (error) {
            console.error('Erro ao excluir usuario', error)
            return ResultadoUtil.falha(
                new RepositorioExcecao('Erro ao excluir usuário.'),
            )
        }
    }

    async update(
        id: number,
        usuario: Usuario,
    ): ResultadoAssincrono<UsuarioRepositoryExceptions, void> {
        try {
            const model = this.usuarioMapper.domainToModel(usuario)
            if (model.ehFalha()) {
                return ResultadoUtil.falha(model.erro)
            }

            const result = await UsuarioModel.update(
                { usuario_id: id },
                model.valor,
            )

            if (result.affected === 0) {
                return ResultadoUtil.falha(
                    new RepositorioSemDadosExcecao(
                        'Usuário não encontrado para atualização',
                    ),
                )
            }

            return ResultadoUtil.sucesso()
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error)
            return ResultadoUtil.falha(
                new RepositorioExcecao('Erro ao atualizar usuário.'),
            )
        }
    }

    async findAll(): ResultadoAssincrono<
        UsuarioRepositoryExceptions,
        Usuario[]
    > {
        try {
            const models = await UsuarioModel.find()
            if (!models || models.length === 0) {
                return ResultadoUtil.falha(
                    new RepositorioSemDadosExcecao('Nenhum usuário encontrado'),
                )
            }

            const usuarios: Usuario[] = []
            for (const model of models) {
                const usuario = this.usuarioMapper.modelToDomain(model)
                if (usuario.ehFalha()) {
                    return ResultadoUtil.falha(usuario.erro)
                }
                usuarios.push(usuario.valor)
            }

            if (usuarios.length === 0) {
                return ResultadoUtil.falha(
                    new RepositorioSemDadosExcecao('Nenhum usuário encontrado'),
                )
            }

            return ResultadoUtil.sucesso(usuarios)
        } catch (error) {
            return ResultadoUtil.falha(new RepositorioExcecao(error))
        }
    }
}
