import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import {
    AbstractController,
    HttpCodeMap,
    HttpResponseConfig,
} from 'src/utils/AbstractControler'
import { AgendarSessaoDto } from './application/dtos/sessaoAprendizagem.dto'
import { AgendarSessaoUseCase } from './application/usecases/AgendarSessao.usecase'
import { Public } from 'src/decorators/public.decorator'
import { BuscarSessaoAprendizagemIdQuery } from './application/queries/BuscarSessaoAprendizagemId.query'

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
    constructor(
        private readonly agendarSessaoUseCase: AgendarSessaoUseCase,
        private readonly buscarSessaoAprendizagemIdQuery: BuscarSessaoAprendizagemIdQuery,
    ) {
        const httpResponseConfig: HttpResponseConfig = {
            httpCodeMap,
            defaultHttpCodeErrors: 500,
        }
        super(httpResponseConfig)
    }

    @Public()
    @ApiOperation({ summary: 'Agenda uma sessão de aprendizagem' })
    @ApiBody({ type: AgendarSessaoDto })
    @ApiResponse({
        status: 200,
        description: 'Sessão agendada com sucesso',
    })
    @Post()
    async agendarSessao(@Body() props: AgendarSessaoDto) {
        const result = await this.agendarSessaoUseCase.execute(props)

        return super.buildResponse({ result })
    }

    @Public()
    @ApiOperation({ summary: 'Busca Sessao de aprendizagem por id' })
    @ApiResponse({
        status: 200,
        type: AgendarSessaoDto,
    })
    @Get(`:idSessao`)
    async buscarSessaoPorId(@Param('idSessao') idSessao: number) {
        const result =
            await this.buscarSessaoAprendizagemIdQuery.execute(idSessao)

        return super.buildResponse({ result })
    }
}
