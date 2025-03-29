import { Inject } from '@nestjs/common'
import { UsuarioRepository } from '../../domain/repositories/usuario.repository'
import {
    PropriedadesInvalidasExcecao,
    RepositorioExcecao,
} from 'src/utils/exception'
import { UsuarioMapper } from '../mappers/Usuario.mapper'
import { UsuarioDto } from '../dtos/Usuario.dto'
import { ResultadoUtil, ResultadoAssincrono } from 'src/utils/result'

export type SalvarUsuarioUseCaseExceptions =
    | RepositorioExcecao
    | PropriedadesInvalidasExcecao

export class SalvarUsuarioUseCase {
    constructor(
        @Inject('UsuarioRepository')
        private readonly usuarioRepository: UsuarioRepository,
    ) {}

    async execute(
        usuario: UsuarioDto, //ver se ta certo
    ): Promise<ResultadoAssincrono<SalvarUsuarioUseCaseExceptions, void>> {
        if (usuario === null || usuario === undefined) {
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao('Usuario não pode ser nulo'),
            )
        }

        const domain = new UsuarioMapper().toDomain(usuario)
        if (domain.ehFalha()) return ResultadoUtil.falha(domain.erro)

        const result = await this.usuarioRepository.save(domain.valor)
        if (result.ehFalha()) return ResultadoUtil.falha(result.erro)

        return ResultadoUtil.sucesso()
    }
}
