import { Inject } from '@nestjs/common'
import {
    UsuarioRepository,
    UsuarioRepositoryExceptions,
} from '../../domain/repositories/usuario.repository'
import { R, ResultAsync } from 'src/utils/resultAsync'
import { InvalidPropsException } from 'src/utils/exception'
import { UsuarioMapper } from '../mappers/Usuario.mapper'
import { UsuarioDto } from '../dtos/Usuario.dto'

// adicionar exceptions UsuarioExceptions
export class SalvarUsuarioUseCase {
    constructor(
        @Inject('UsuarioRepository')
        private readonly usuarioRepository: UsuarioRepository,
    ) {}

    async execute(
        usuario: UsuarioDto, //ver se ta certo
    ): Promise<ResultAsync<UsuarioRepositoryExceptions, void>> {
        //melhorar validação
        if (usuario === null || usuario === undefined) {
            return R.failure(
                new InvalidPropsException('Usuario não pode ser nulo'),
            )
        }

        const domain = new UsuarioMapper().toDomain(usuario)
        if (domain.isFailure()) return R.failure(domain.error)

        const result = await this.usuarioRepository.save(domain.value)
        if (result.isFailure()) return R.failure(result.error)

        return R.ok()
    }
}
