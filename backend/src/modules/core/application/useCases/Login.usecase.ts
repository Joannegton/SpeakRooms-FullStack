import { Inject, Injectable } from '@nestjs/common'
import { LoginParamsDto, LoginResultDto } from '../dtos/Login.dto'
import {
    PropriedadesInvalidasExcecao,
    RepositorioExcecao,
    ServicoExcecao,
    ResultadoAssincrono,
    ResultadoUtil,
} from 'http-service-result'
import { UsuarioRepository } from 'src/modules/core/domain/repositories/Usuario.repository'
import {
    AuthRepository,
    AutenticacaoResult,
} from '../../domain/repositories/Auth.repository'
import { TentativaLoginRepository } from '../../domain/repositories/TentativaLogin.repository'
import { TentativaLogin } from '../../domain/models/TentativaLogin.model'
import { Usuario } from '../../domain/models/Usuario.model'

//TODO melhorar para nãoautorizadoexception, ver unauthorized do nest
type LoginUseCaseExceptions =
    | PropriedadesInvalidasExcecao
    | ServicoExcecao
    | RepositorioExcecao

type LoginProps = LoginParamsDto & {
    ipAddress: string
    userAgent?: string
}

// Constantes para mensagens de erro
const ERRO_CREDENCIAIS_INVALIDAS = 'Credenciais inválidas'
const MOTIVO_FALHA_USUARIO_INVALIDO = 'Usuário inválido'

@Injectable()
export class LoginUseCase {
    constructor(
        @Inject('UsuarioRepository')
        private readonly usuarioRepository: UsuarioRepository,
        @Inject('AuthRepository')
        private readonly authRepository: AuthRepository,
        @Inject('TentativaLoginRepository')
        private readonly tentativaLoginRepository: TentativaLoginRepository,
    ) {}

    async execute(
        props: LoginProps,
    ): ResultadoAssincrono<LoginUseCaseExceptions, LoginResultDto> {
        if (!props.emailOuUsuario || !props.senha) {
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao(ERRO_CREDENCIAIS_INVALIDAS),
            )
        }

        const usuario = await this.usuarioRepository.findByUsuarioOrEmail(
            props.emailOuUsuario,
        )

        if (usuario.ehFalha()) {
            return await this.tratarUsuarioNaoEncontrado(props)
        }

        const validacaoTentativa =
            await this.tentativaLoginRepository.validarTentativaLogin({
                usuarioId: usuario.valor.id,
                ipAddress: props.ipAddress,
            })
        if (validacaoTentativa.ehFalha()) {
            return ResultadoUtil.falha(validacaoTentativa.erro)
        }

        const autenticacao = await this.authRepository.autenticar({
            usuario: usuario.valor,
            senha: props.senha,
            emailOuUsuario: props.emailOuUsuario,
        })

        if (autenticacao.ehFalha()) {
            await this.registrarTentativaFalha(
                props,
                usuario.valor.id,
                autenticacao.erro.message,
            )
            return ResultadoUtil.falha(autenticacao.erro)
        }

        return await this.processarLoginBemSucedido(
            props,
            usuario.valor,
            autenticacao.valor,
        )
    }

    private async tratarUsuarioNaoEncontrado(
        props: LoginProps,
    ): ResultadoAssincrono<LoginUseCaseExceptions, LoginResultDto> {
        const validacaoTentativa =
            await this.tentativaLoginRepository.validarTentativaLogin({
                ipAddress: props.ipAddress,
            })

        if (validacaoTentativa.ehFalha()) {
            return ResultadoUtil.falha(validacaoTentativa.erro)
        }

        await this.registrarTentativaFalha(
            props,
            undefined,
            MOTIVO_FALHA_USUARIO_INVALIDO,
        )

        return ResultadoUtil.falha(
            new PropriedadesInvalidasExcecao(ERRO_CREDENCIAIS_INVALIDAS),
        )
    }

    private async registrarTentativaFalha(
        props: LoginProps,
        usuarioId?: number,
        motivoFalha?: string,
    ): Promise<void> {
        const tentativaFalha = this.criarTentativaLogin(
            props,
            usuarioId,
            false,
            motivoFalha,
        )

        if (tentativaFalha.ehSucesso()) {
            await this.tentativaLoginRepository.registrarTentativaLogin(
                tentativaFalha.valor,
            )
        }
    }

    private criarTentativaLogin(
        props: LoginProps,
        usuarioId?: number,
        sucesso: boolean = false,
        motivoFalha?: string,
    ) {
        return TentativaLogin.criar({
            ipAddress: props.ipAddress,
            userAgent: props.userAgent,
            usuarioId,
            sucesso,
            motivoFalha,
        })
    }

    private async processarLoginBemSucedido(
        props: LoginProps,
        usuario: Usuario,
        autenticacao: AutenticacaoResult,
    ): ResultadoAssincrono<LoginUseCaseExceptions, LoginResultDto> {
        const resultadoRegistro = await this.registrarTentativaSucesso(
            props,
            usuario.id,
        )

        if (resultadoRegistro.ehFalha()) {
            return ResultadoUtil.falha(resultadoRegistro.erro)
        }

        return ResultadoUtil.sucesso({
            accessToken: autenticacao.access_token,
            refreshToken: autenticacao.refresh_token,
            nome_usuario: autenticacao.nome_usuario,
        })
    }

    private async registrarTentativaSucesso(
        props: LoginProps,
        usuarioId: number,
    ): ResultadoAssincrono<LoginUseCaseExceptions, void> {
        const limparTentativas =
            await this.tentativaLoginRepository.limparTentativas({
                ipAddress: props.ipAddress,
                usuarioId,
            })

        if (limparTentativas.ehFalha()) {
            return ResultadoUtil.falha(limparTentativas.erro)
        }

        const tentativaSucesso = this.criarTentativaLogin(
            props,
            usuarioId,
            true,
        )

        if (tentativaSucesso.ehFalha()) {
            return ResultadoUtil.falha(tentativaSucesso.erro)
        }

        const registroTentativa =
            await this.tentativaLoginRepository.registrarTentativaLogin(
                tentativaSucesso.valor,
            )

        if (registroTentativa.ehFalha()) {
            return ResultadoUtil.falha(registroTentativa.erro)
        }

        return ResultadoUtil.sucesso()
    }
}
