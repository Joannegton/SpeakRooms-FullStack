import { Inject } from '@nestjs/common'
import { UsuarioRepository } from '../../domain/repositories/Usuario.repository'
import {
    PropriedadesInvalidasExcecao,
    RepositorioExcecao,
} from 'http-service-result'
import { UsuarioMapperApplication } from '../mappers/Usuario.mapper'
import { CriarUsuarioDto } from '../dtos/Usuario.dto'
import { ResultadoUtil, ResultadoAssincrono } from 'http-service-result'
import { HashService } from '../../domain/services/Hash.service'
import { validarSenha } from 'src/utils/ValidarSenha'
import { EmailService } from 'src/modules/shared/services/EmailService'

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
        private readonly emailService: EmailService,
    ) {}

    async execute(
        usuario: CriarUsuarioDto,
    ): ResultadoAssincrono<SalvarUsuarioUseCaseExceptions, void> {
        const usuarioExistente =
            await this.usuarioRepository.findByUsuarioOrEmail(
                usuario.nomeUsuario,
            )
        const emailUsuarioExistente =
            await this.usuarioRepository.findByUsuarioOrEmail(usuario.email)
        if (usuarioExistente.ehSucesso() || emailUsuarioExistente.ehSucesso()) {
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao(
                    'Usuário ou e-mail já cadastrado.',
                ),
            )
        }

        if (!validarSenha(usuario.senha)) {
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao(
                    'A senha precisa ter ao menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial.',
                ),
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

        const enviarEmail = await this.emailService.enviarEmail(
            usuario.email,
            'Cadastro de Conta',
            `Olá ${usuario.nomeUsuario}, sua conta foi criada com sucesso!
             Para ativa-la, clique no link abaixo:
                http://localhost:3000/usuario/ativar-conta/${usuario.nomeUsuario}
            `,
        )
        if (enviarEmail.ehFalha()) return ResultadoUtil.falha(enviarEmail.erro)

        return ResultadoUtil.sucesso()
    }
}
