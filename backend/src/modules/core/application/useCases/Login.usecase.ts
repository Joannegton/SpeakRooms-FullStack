import { Inject, Injectable } from '@nestjs/common'
import { LoginParamsDto, LoginResultDto } from '../dtos/Login.dto'
import { ResultadoAssincrono, ResultadoUtil } from 'src/utils/result'
import {
    PropriedadesInvalidasExcecao,
    RepositorioExcecao,
    ServicoExcecao,
} from 'src/utils/exception'
import { UsuarioRepository } from 'src/modules/core/domain/repositories/Usuario.repository'
import { AuthService } from '../../domain/services/Auth.service'

//melhorar para nãoautorizadoexception, ver unauthorized do nest
type LoginUseCaseExceptions =
    | PropriedadesInvalidasExcecao
    | ServicoExcecao
    | RepositorioExcecao

type LoginResultToken = {
    accessToken: string
    usuario: LoginResultDto
}

@Injectable()
export class LoginUseCase {
    constructor(
        @Inject('UsuarioRepository')
        private readonly usuarioRepository: UsuarioRepository,
        @Inject('AuthService')
        private readonly authService: AuthService,
    ) {}

    async execute(
        login: LoginParamsDto,
    ): ResultadoAssincrono<LoginUseCaseExceptions, LoginResultToken> {
        const { emailOuUsuario, senha } = login

        if (!emailOuUsuario || !senha) {
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao('Credenciais inválidas'),
            )
        }

        const usuario =
            await this.usuarioRepository.findByUsuarioOrEmail(emailOuUsuario)
        if (usuario.ehFalha()) {
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao('Credenciais inválidas'),
            )
        }

        const autenticar = await this.authService.autenticar({
            usuario: usuario.valor,
            senha,
            emailOuUsuario: emailOuUsuario,
        })

        if (autenticar.ehFalha()) {
            return ResultadoUtil.falha(autenticar.erro)
        }

        return ResultadoUtil.sucesso({
            accessToken: autenticar.valor.access_token,
            usuario: {
                usuario_id: autenticar.valor.usuario_id,
                nome_usuario: autenticar.valor.nome_usuario,
            },
        })
    }
}
