import { R, Result } from 'src/utils/result'
import { Usuario } from '../../domain/models/usuario.model'
import { UsuarioRepositoryExceptions } from '../../domain/repositories/usuario.repository'
import { UsuarioModel } from '../models/Usuario.model'
import { InvalidPropsException } from 'src/utils/exception'

export class UsuarioMapper {
    public modelToDomain(
        model: UsuarioModel,
    ): Result<UsuarioRepositoryExceptions, Usuario> {
        if (!model)
            return R.failure(
                new InvalidPropsException('Carrossel não encontrado.'),
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
                pontos: model.pontos,
                created_at: model.created_at,
                updated_at: model.updated_at,
                ativo: model.ativo,
            },
            model.usuario_id,
        )
        if (domain.isFailure()) return R.failure(domain.error)
        return R.ok(domain.value)
    }

    domainToModel(domain: Usuario): UsuarioModel {
        const model = UsuarioModel.create({
            nome_usuario: domain.nomeUsuario,
            email: domain.email,
            hash_senha: domain.hashSenha,
            primeiro_nome: domain.primeiroNome,
            sobrenome: domain.sobrenome,
            url_avatar: domain.urlAvatar,
            nivel_ingles_id: domain.nivelInglesId,
            pontos: domain.pontos,
            created_at: domain.created_at,
            updated_at: domain.updated_at,
            ativo: domain.ativo,
            usuario_id: domain.id,
        })
        return model
    }
}
