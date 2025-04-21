import { Resultado, ResultadoUtil } from 'src/utils/result'
import { Usuario } from '../../domain/models/Usuario.model'
import { UsuarioRepositoryExceptions } from '../../domain/repositories/Usuario.repository'
import { UsuarioModel } from '../models/Usuario.model'
import { PropriedadesInvalidasExcecao } from 'src/utils/exception'

export class UsuarioMapper {
    public modelToDomain(
        model: UsuarioModel,
    ): Resultado<UsuarioRepositoryExceptions, Usuario> {
        if (!model)
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao('Usuário não encontrado.'),
            )

        const domain = Usuario.carregar(
            {
                nomeUsuario: model.nome_usuario,
                email: model.email,
                hashSenha: model.hash_senha,
                primeiroNome: model.primeiro_nome,
                sobrenome: model.sobrenome,
                urlAvatar: model.url_avatar,
                nivelInglesId: model.nivel_ingles_id,
                interessesId: model.interesses_id,
                pontos: model.pontos,
                created_at: model.created_at,
                updated_at: model.updated_at,
                ativo: model.ativo,
            },
            model.usuario_id,
        )
        if (domain.ehFalha()) return ResultadoUtil.falha(domain.erro)
        return ResultadoUtil.sucesso(domain.valor)
    }

    domainToModel(
        domain: Usuario,
    ): Resultado<PropriedadesInvalidasExcecao, UsuarioModel> {
        if (!domain)
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao('Usuário não encontrado.'),
            )

        const model = UsuarioModel.create({
            nome_usuario: domain.nomeUsuario,
            email: domain.email,
            hash_senha: domain.hashSenha,
            primeiro_nome: domain.primeiroNome,
            sobrenome: domain.sobrenome,
            url_avatar: domain.urlAvatar,
            nivel_ingles_id: domain.nivelInglesId,
            interesses_id: domain.interessesId,
            pontos: domain.pontos,
            created_at: domain.created_at,
            updated_at: domain.updated_at,
            ativo: domain.ativo,
            usuario_id: domain.id,
        })

        return ResultadoUtil.sucesso(model)
    }
}
