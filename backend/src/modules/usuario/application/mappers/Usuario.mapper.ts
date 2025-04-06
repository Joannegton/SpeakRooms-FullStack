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

    toDomain(dto: UsuarioDto): Resultado<UsuarioMapperExceptions, Usuario> {
        const domainResult = Usuario.criar({
            nomeUsuario: dto.nomeUsuario,
            email: dto.email,
            hashSenha: dto.senha,
            primeiroNome: dto.primeiroNome,
            sobrenome: dto.sobrenome,
            nivelInglesId: dto.nivelInglesId,
        })

        if (domainResult.ehFalha()) {
            return ResultadoUtil.falha(domainResult.erro)
        }

        return ResultadoUtil.sucesso(domainResult.valor)
    }
}
