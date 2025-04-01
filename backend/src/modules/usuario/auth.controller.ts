import { Body, Controller, Post } from '@nestjs/common'
import {
    AbstractController,
    HttpCodeMap,
    HttpResponseConfig,
} from 'src/utils/AbstractControler'
import { LoginUseCase } from './application/useCases/Login.usecase'
import { LoginParamsDto } from './application/dtos/Login.dto'
import { Public } from './infra/decorators/public.decorator'

const httpCodeMap: HttpCodeMap = {
    PropriedadesInvalidasExcecao: 400,
    RepositorioExcecao: 500,
    ServicoExcecao: 500,
}

@Controller()
export class AuthController extends AbstractController {
    constructor(private readonly loginUseCase: LoginUseCase) {
        const httpResponseConfig: HttpResponseConfig = {
            httpCodeMap,
            defaultHttpCodeErrors: 500,
        }
        super(httpResponseConfig)
    }

    @Public()
    @Post('/login')
    async login(@Body() params: LoginParamsDto) {
        const result = await this.loginUseCase.execute(params)
        return super.buildResponse({ result })
    }

    @Post('/logout')
    async logout() {
        // Implementar lógica de logout, se necessário
        return super.buildResponse({ result: null })
    }
}
