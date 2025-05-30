import { Body, Controller, Param, Post, Res } from '@nestjs/common'
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
import { Response } from 'express'
import { ResultadoUtil } from 'http-service-result'
import { RecuperarSenhaUseCase } from '../application/useCases/RecuperarSenha.usecase'
import { VerificarTokenRecuperarSenhaUseCase } from '../application/useCases/VerificarTokenRecuperarSenha.usecase'
import { VerificarTokenRecuperarSenhaDto } from '../application/dtos/VerificarTokenRecuperarSenha.dto'
import { AlterarSenhaDto } from '../application/dtos/AlterarSenha.dto'
import { AlterarSenhaUseCase } from '../application/useCases/ALterarSenha.usecase'

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
    ) {
        const result = await this.loginUseCase.execute(params)
        if (result.ehFalha()) {
            return ResultadoUtil.falha(result.erro)
        }

        response.cookie('acessToken', result.valor.accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 3600000, // 1 hora
        })

        return super.buildResponse({
            result: ResultadoUtil.sucesso(result.valor.usuario),
        }) // arrumar o retorno
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
}
