import { Inject } from '@nestjs/common'
import { UsuarioRepository } from '../../domain/repositories/usuario.repository'
import {
    PropriedadesInvalidasExcecao,
    RepositorioExcecao,
} from 'src/utils/exception'
import { UsuarioMapperApplication } from '../mappers/Usuario.mapper'
import { UsuarioDto } from '../dtos/Usuario.dto'
import { ResultadoUtil, ResultadoAssincrono } from 'src/utils/result'
import { HashService } from 'src/shared/services/Hash.service'

export type SalvarUsuarioUseCaseExceptions =
    | RepositorioExcecao
    | PropriedadesInvalidasExcecao

export class SalvarUsuarioUseCase {
    constructor(
        @Inject('UsuarioRepository')
        private readonly usuarioRepository: UsuarioRepository,
        private readonly usuarioMapper: UsuarioMapperApplication,
        private readonly hashService: HashService,
    ) {}

    async execute(
        usuario: UsuarioDto,
    ): Promise<ResultadoAssincrono<SalvarUsuarioUseCaseExceptions, void>> {
        if (!usuario || !usuario.nomeUsuario || !usuario.email) {
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao('Dados do usuário inválidos.'),
            )
        }
        const hashSenhaResult = await this.hashService.hashPassword(
            usuario.senha,
        )
        usuario.senha = hashSenhaResult

        const domain = this.usuarioMapper.toDomain(usuario)
        if (domain.ehFalha()) return ResultadoUtil.falha(domain.erro)

        const result = await this.usuarioRepository.save(domain.valor)
        if (result.ehFalha()) return ResultadoUtil.falha(result.erro)

        return ResultadoUtil.sucesso()
    }
}
