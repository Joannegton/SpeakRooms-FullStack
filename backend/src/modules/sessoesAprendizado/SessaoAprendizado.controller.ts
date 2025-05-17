import { Body, Controller, Post } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import {
    AbstractController,
    HttpCodeMap,
    HttpResponseConfig,
} from 'src/utils/AbstractControler'
import { AgendarSessaoDto } from './application/dtos/sessaoAprendizagem.dto'
import { AgendarSessaoUseCase } from './application/usecases/AgendarSessao.usecase'
import { Public } from 'src/decorators/public.decorator'

const httpCodeMap: HttpCodeMap = {
    PropriedadesInvalidasExcecao: 400,
    NaoAutorizadoException: 401,
    RepositorioExcecao: 500,
    ServicoExcecao: 500,
}

@ApiResponse({ status: 400, description: 'Propriedades invalidas' })
@ApiResponse({ status: 401, description: 'Não autorizado' })
@ApiResponse({ status: 500, description: 'Erro interno no servidor.' })
@ApiTags('Sessão de Aprendizado')
@Controller('sessao')
export class SessaoAprendizadoController extends AbstractController {
    constructor(private readonly agendarSessaoUseCase: AgendarSessaoUseCase) {
        const httpResponseConfig: HttpResponseConfig = {
            httpCodeMap,
            defaultHttpCodeErrors: 500,
        }
        super(httpResponseConfig)
    }

    @Post()
    @Public()
    async agendarSessao(@Body() props: AgendarSessaoDto) {
        const result = await this.agendarSessaoUseCase.execute(props)

        return super.buildResponse({ result })
    }
}
