import { Body, Controller, Post } from '@nestjs/common'
import { SalvarUsuarioUseCase } from './application/useCases/SalvarUsuario.usecase'
import { UsuarioDto } from './application/dtos/Usuario.dto'
import {
    AbstractController,
    HttpCodeMap,
    HttpResponseConfig,
} from 'src/utils/AbstractControler'

const httpCodeMap: HttpCodeMap = {
    PropriedadesInvalidasExcecao: 400,
    RepositorioExcecao: 500,
}

@Controller('usuario')
export class UsuarioController extends AbstractController {
    constructor(private readonly salvarUsuarioUseCase: SalvarUsuarioUseCase) {
        const httpResponseConfig: HttpResponseConfig = {
            httpCodeMap,
            defaultHttpCodeErrors: 500,
        }
        super(httpResponseConfig)
    }

    @Post('/cadastro')
    async salvarUsuario(@Body() params: UsuarioDto) {
        const result = await this.salvarUsuarioUseCase.execute(params)

        return super.buildResponse({ result })
    }
}
