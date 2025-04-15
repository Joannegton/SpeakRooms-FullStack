import { Body, Controller, Post, Res } from '@nestjs/common'
import {
    AbstractController,
    HttpCodeMap,
    HttpResponseConfig,
} from 'src/utils/AbstractControler'
import { LoginUseCase } from '../application/useCases/Login.usecase'
import { LoginParamsDto, LoginResultDto } from '../application/dtos/Login.dto'
import { Public } from '../../../decorators/public.decorator'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
import { ResultadoUtil } from 'src/utils/result'

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
    constructor(private readonly loginUseCase: LoginUseCase) {
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
    @Post('/login')
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
            successStatusCode: 200,
        })
    }

    @Post('/logout')
    async logout() {
        // Implementar lógica de logout, se necessário
        return super.buildResponse({ result: null })
    }
}
