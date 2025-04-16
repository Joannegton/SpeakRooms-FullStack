import { Inject } from '@nestjs/common'
import { UsuarioRepository } from '../../domain/repositories/usuario.repository'
import {
    PropriedadesInvalidasExcecao,
    RepositorioExcecao,
} from 'src/utils/exception'
import { UsuarioMapperApplication } from '../mappers/Usuario.mapper'
import { CriarUsuarioDto } from '../dtos/Usuario.dto'
import { ResultadoUtil, ResultadoAssincrono } from 'src/utils/result'
import { HashService } from '../../domain/services/Hash.service'

export type SalvarUsuarioUseCaseExceptions =
    | RepositorioExcecao
    | PropriedadesInvalidasExcecao

export class SalvarUsuarioUseCase {
    constructor(
        @Inject('UsuarioRepository')
        private readonly usuarioRepository: UsuarioRepository,
        @Inject('HashService')
        private readonly hashService: HashService,
        private readonly usuarioMapper: UsuarioMapperApplication,
    ) {}

    async execute(
        usuario: CriarUsuarioDto,
    ): ResultadoAssincrono<SalvarUsuarioUseCaseExceptions, void> {
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
