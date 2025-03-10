import { UsuarioDto } from '../../application/dtos/Usuario.dto'
import { Usuario } from '../../domain/models/usuario.model'

export class UsuarioMapper {
    static toDomain(dto: UsuarioDto): Usuario {
        //melhorar
        const usuario = new Usuario(dto.id, dto.nome, dto.email, dto.senha)
        return usuario
    }
}
