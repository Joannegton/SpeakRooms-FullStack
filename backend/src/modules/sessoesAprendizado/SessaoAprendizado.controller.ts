import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Request,
} from '@nestjs/common'
import {
    ApiBody,
    ApiOperation,
    ApiParam,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger'
import {
    AbstractController,
    HttpCodeMap,
    HttpResponseConfig,
} from 'src/utils/AbstractControler'
import { AgendarSessaoDto } from './application/dtos/sessaoAprendizagem.dto'
import { AgendarSessaoUseCase } from './application/usecases/AgendarSessao.usecase'
import { BuscarSessaoAprendizagemIdQuery } from './application/queries/BuscarSessaoAprendizagemId.query'
import { DeletarSessaoAprendizagemUseCase } from './application/usecases/DeletarSessaoAprendizagem.usecase'
import { BuscarSessoesAprendizagemQuery } from './application/queries/BuscarSessoesAprendizagem.query'

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
@Controller('sessao-aprendizado')
export class SessaoAprendizadoController extends AbstractController {
    constructor(
        private readonly agendarSessaoUseCase: AgendarSessaoUseCase,
        private readonly buscarSessaoAprendizagemIdQuery: BuscarSessaoAprendizagemIdQuery,
        private readonly buscarSessoesAprendizagemQuery: BuscarSessoesAprendizagemQuery,
        private readonly deletarSessaoAprendizagemUseCase: DeletarSessaoAprendizagemUseCase,
    ) {
        const httpResponseConfig: HttpResponseConfig = {
            httpCodeMap,
            defaultHttpCodeErrors: 500,
        }
        super(httpResponseConfig)
    }

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

    @ApiOperation({ summary: 'Busca todas as sessões de aprendizagem' })
    @ApiResponse({
        status: 200,
        description: 'Lista de sessões de aprendizagem',
        type: [AgendarSessaoDto],
    })
    @Get()
    async buscarTodasSessoes() {
        const result = await this.buscarSessoesAprendizagemQuery.execute()

        return super.buildResponse({ result })
    }

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

    @ApiOperation({ summary: 'Deletar uma sessão de aprendizagem' })
    @ApiResponse({
        status: 200,
        description: 'Sessão deletada com sucesso',
    })
    @ApiParam({
        name: 'idSessao',
        description: 'ID da sessão de aprendizagem',
        type: 'number',
    })
    @Delete(':idSessao')
    async deletarSessao(
        @Param('idSessao') idSessao: number,
        @Request() req: Request,
    ) {
        const idUsuario = req['usuario'].id
        const result = await this.deletarSessaoAprendizagemUseCase.execute(
            idSessao,
            idUsuario,
        )

        return super.buildResponse({ result })
    }
}
