import { ResultadoUtil, Resultado } from 'src/utils/result'
import { Usuario } from '../../domain/models/usuario.model'
import { UsuarioDto } from '../dtos/Usuario.dto'
import {
    PropriedadesInvalidasExcecao,
    RepositorioExcecao,
} from 'src/utils/exception'

export type UsuarioMapperExceptions =
    | RepositorioExcecao
    | PropriedadesInvalidasExcecao

export class UsuarioMapperApplication {
    toDto(dominio: Usuario): UsuarioDto {
        return {
            usuario_id: dominio.id,
            nomeUsuario: dominio.nomeUsuario,
            email: dominio.email,
            senha: dominio.hashSenha,
            primeiroNome: dominio.primeiroNome,
            sobrenome: dominio.sobrenome,
            urlAvatar: dominio.urlAvatar,
            nivelInglesId: dominio.nivelInglesId,
            pontos: dominio.pontos,
            created_at: dominio.created_at,
            updated_at: dominio.updated_at,
            ativo: dominio.ativo,
        }
    }

    toDomain(usuario: UsuarioDto): Resultado<UsuarioMapperExceptions, Usuario> {
        if (!usuario) {
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao('Usuário não pode ser nulo'),
            )
        }

        const domainResult = Usuario.criar({
            nomeUsuario: usuario.nomeUsuario,
            email: usuario.email,
            hashSenha: usuario.senha,
            primeiroNome: usuario.primeiroNome,
            sobrenome: usuario.sobrenome,
            nivelInglesId: usuario.nivelInglesId,
        })

        if (domainResult.ehFalha()) {
            return ResultadoUtil.falha(domainResult.erro)
        }

        return ResultadoUtil.sucesso(domainResult.valor)
    }
}
