import { Body, Controller, Param, Post, Res, Req } from '@nestjs/common'
import {
    AbstractController,
    HttpCodeMap,
    HttpResponseConfig,
} from 'src/utils/AbstractControler'
import { LoginUseCase } from '../application/useCases/Login.usecase'
import { LoginParamsDto, LoginResultDto } from '../application/dtos/Login.dto'
import { Public } from '../../../decorators/public.decorator'
import {
    ApiBody,
    ApiOperation,
    ApiParam,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger'
import { Response, Request } from 'express'
import { ResultadoUtil } from 'http-service-result'
import { RecuperarSenhaUseCase } from '../application/useCases/RecuperarSenha.usecase'
import { VerificarTokenRecuperarSenhaUseCase } from '../application/useCases/VerificarTokenRecuperarSenha.usecase'
import { VerificarTokenRecuperarSenhaDto } from '../application/dtos/VerificarTokenRecuperarSenha.dto'
import { AlterarSenhaDto } from '../application/dtos/AlterarSenha.dto'
import { AlterarSenhaUseCase } from '../application/useCases/ALterarSenha.usecase'
import {
    RefreshTokenDto,
    RefreshTokenProps,
} from '../application/dtos/RefreshToken.dto'
import { RenovarTokenUseCase } from '../application/useCases/RenovarToken.usecase'
import { LogoutUseCase } from '../application/useCases/Logout.usecase'

const httpCodeMap: HttpCodeMap = {
    PropriedadesInvalidasExcecao: 400,
    RepositorioExcecao: 500,
    ServicoExcecao: 500,
    NaoAutorizadoException: 401,
}

@ApiTags('Auth')
@ApiResponse({ status: 400, description: 'Propriedades invalidas' })
@ApiResponse({ status: 401, description: 'Não autorizado' })
@ApiResponse({ status: 500, description: 'Erro interno no servidor.' })
@Controller('auth')
export class AuthController extends AbstractController {
    constructor(
        private readonly loginUseCase: LoginUseCase,
        private readonly recuperarSenhaUseCase: RecuperarSenhaUseCase,
        private readonly verificarTokenRecuperarSenhaUseCase: VerificarTokenRecuperarSenhaUseCase,
        private readonly alterarSenhaUseCase: AlterarSenhaUseCase,
        private readonly renovarTokenUseCase: RenovarTokenUseCase,
        private readonly logoutUseCase: LogoutUseCase,
    ) {
        const httpResponseConfig: HttpResponseConfig = {
            httpCodeMap,
            defaultHttpCodeErrors: 500,
        }
        super(httpResponseConfig)
    }

    @Public()
    @ApiOperation({ summary: 'Realiza o login do usuário' })
    @ApiResponse({
        status: 200,
        description: 'Login realizado com sucesso',
        type: LoginResultDto,
    })
    @ApiBody({ type: LoginParamsDto })
    @Post()
    async login(
        @Body() params: LoginParamsDto,
        @Res({ passthrough: true }) response: Response,
        @Req() request: Request,
    ) {
        const ipAddress =
            request.ip || request.socket.remoteAddress || 'unknown'
        const userAgent = request.get('User-Agent') || 'unknown'

        const result = await this.loginUseCase.execute({
            ...params,
            ipAddress,
            userAgent,
        })
        if (result.ehFalha()) {
            return super.buildResponse({ result })
        }

        response.cookie('acessToken', result.valor.accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 3600000, // 1 hora
        })

        response.cookie('refreshToken', result.valor.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
        })

        return super.buildResponse({ result }) // TODO arrumar o retorno para não devolver os tokens
    }

    @ApiOperation({ summary: 'Recupera a senha do usuário' })
    @ApiResponse({
        status: 200,
        description: 'Senha recuperada com sucesso',
    })
    @ApiParam({
        name: 'usuarioOuEmail',
        required: true,
        description: 'Nome de usúario ou email para recuperação de senha',
    })
    @Public()
    @Post('/recuperarSenha/:usuarioOuEmail')
    async recuperarSenha(@Param('usuarioOuEmail') usuarioOuEmail: string) {
        const result = await this.recuperarSenhaUseCase.execute(usuarioOuEmail)
        return super.buildResponse({ result })
    }

    @Public()
    @ApiOperation({
        summary:
            'Verifica o token de recuperação de senha e retorna JWT momentâneo',
    })
    @ApiResponse({
        status: 200,
        description: 'JWT gerado',
    })
    @ApiBody({ type: VerificarTokenRecuperarSenhaDto })
    @Post('/recuperarSenha/verificar/token')
    async verificarToken(
        @Body() body: VerificarTokenRecuperarSenhaDto,
        @Res({ passthrough: true }) response: Response,
    ) {
        const result =
            await this.verificarTokenRecuperarSenhaUseCase.execute(body)
        if (result.ehFalha()) {
            return super.buildResponse({ result })
        }

        response.cookie('resetSenhaToken', result.valor, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 10 * 60 * 1000, // 10 minutos
        })

        return super.buildResponse({
            result: ResultadoUtil.sucesso(
                'Token verificado e JWT gerado com sucesso',
            ),
            successStatusCode: 200,
        })
    }

    @ApiOperation({ summary: 'Altera a senha do usuário' })
    @ApiResponse({
        status: 200,
        description: 'Senha alterada com sucesso',
    })
    @ApiBody({
        description: 'Dados para alteração de senha',
        type: AlterarSenhaDto,
    })
    @Post('/alterarSenha')
    async alterarSenha(@Body() alterarSenhaDto: AlterarSenhaDto) {
        const result = await this.alterarSenhaUseCase.execute(alterarSenhaDto)
        return super.buildResponse({ result })
    }

    @Public()
    @ApiOperation({ summary: 'Renova o access token usando o refresh token' })
    @ApiResponse({
        status: 200,
        description: 'Token renovado com sucesso',
        type: RefreshTokenDto,
    })
    @ApiBody({ type: RefreshTokenProps })
    @Post('/refresh')
    async refreshToken(
        @Body() refreshTokenDto: RefreshTokenProps,
        @Res({ passthrough: true }) response: Response,
    ) {
        const result = await this.renovarTokenUseCase.execute(refreshTokenDto)
        if (result.ehFalha()) {
            return super.buildResponse({ result })
        }

        response.cookie('acessToken', result.valor.accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 3600000, // 1 hora
        })

        response.cookie('refreshToken', result.valor.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
        })

        return super.buildResponse({ result })
    }

    @Public()
    @ApiOperation({ summary: 'Realiza logout revogando o refresh token' })
    @ApiResponse({
        status: 200,
        description: 'Logout realizado com sucesso',
    })
    @ApiBody({ type: RefreshTokenProps })
    @Post('/logout')
    async logout(
        @Body() refreshTokenDto: RefreshTokenProps,
        @Res({ passthrough: true }) response: Response,
    ) {
        const result = await this.logoutUseCase.execute(refreshTokenDto)

        response.clearCookie('acessToken')
        response.clearCookie('refreshToken')

        return super.buildResponse({ result })
    }
}
