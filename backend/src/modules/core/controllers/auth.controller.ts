import { Body, Controller, Post } from '@nestjs/common'
import {
    AbstractController,
    HttpCodeMap,
    HttpResponseConfig,
} from 'src/utils/AbstractControler'
import { LoginUseCase } from '../application/useCases/Login.usecase'
import { LoginParamsDto, LoginResultDto } from '../application/dtos/Login.dto'
import { Public } from '../../../decorators/public.decorator'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

const httpCodeMap: HttpCodeMap = {
    PropriedadesInvalidasExcecao: 400,
    RepositorioExcecao: 500,
    ServicoExcecao: 500,
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
    async login(@Body() params: LoginParamsDto) {
        const result = await this.loginUseCase.execute(params)
        // modificar para enviar o token nos cookies
        return super.buildResponse({ result })
    }

    @Post('/logout')
    async logout() {
        // Implementar lógica de logout, se necessário
        return super.buildResponse({ result: null })
    }
}
