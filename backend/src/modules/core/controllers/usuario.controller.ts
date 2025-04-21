import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { SalvarUsuarioUseCase } from '../application/useCases/SalvarUsuario.usecase'
import {
    AtualizarUsuarioDto,
    CriarUsuarioDto,
    UsuarioDto,
} from '../application/dtos/Usuario.dto'
import {
    AbstractController,
    HttpCodeMap,
    HttpResponseConfig,
} from 'src/utils/AbstractControler'
import { BuscarUsuariosQuery } from '../application/queries/BuscarUsuarios.query'
import { AtualizarUsuarioUseCase } from '../application/useCases/AtualizarUsuario.usecase'
import { DeletarUsuarioUseCase } from '../application/useCases/DeletarUsuario.usecase'
import { BuscarUsuarioQuery } from '../application/queries/BuscarUsuarioEmailUsuario.query'
import { Public } from '../../../decorators/public.decorator'
import {
    ApiBody,
    ApiOperation,
    ApiParam,
    ApiResponse,
    ApiSecurity,
    ApiTags,
} from '@nestjs/swagger'
import { AtivarContaUsuarioUseCase } from '../application/useCases/AtivarContaUsuario.usecase'

const httpCodeMap: HttpCodeMap = {
    PropriedadesInvalidasExcecao: 400,
    NaoAutorizadoException: 401,
    RepositorioExcecao: 500,
    ServicoExcecao: 500,
}

@ApiTags('Usuario')
@ApiResponse({ status: 400, description: 'Propriedades invalidas' })
@ApiResponse({ status: 401, description: 'Não autorizado' })
@ApiResponse({ status: 500, description: 'Erro interno no servidor.' })
@Controller('usuario')
export class UsuarioController extends AbstractController {
    constructor(
        private readonly salvarUsuarioUseCase: SalvarUsuarioUseCase,
        private readonly listarUsuarioUseCase: BuscarUsuarioQuery,
        private readonly listarUsuariosUseCase: BuscarUsuariosQuery,
        private readonly atualizarUsuarioUseCase: AtualizarUsuarioUseCase,
        private readonly deletarUsuarioUseCase: DeletarUsuarioUseCase,
        private readonly ativarContaUsuarioUsecase: AtivarContaUsuarioUseCase,
    ) {
        const httpResponseConfig: HttpResponseConfig = {
            httpCodeMap,
            defaultHttpCodeErrors: 500,
        }
        super(httpResponseConfig)
    }

    @Public()
    @ApiOperation({ summary: 'Cadastra um novo usuário no sistema' })
    @ApiBody({ type: CriarUsuarioDto })
    @ApiResponse({
        status: 200,
        description: 'Usuário cadastrado com sucesso.',
    })
    @Post()
    async salvarUsuario(@Body() params: CriarUsuarioDto) {
        const result = await this.salvarUsuarioUseCase.execute(params)

        return super.buildResponse({ result })
    }

    @ApiSecurity('accessToken')
    @ApiOperation({ summary: 'Lista todos os usuários do sistema' })
    @ApiResponse({ status: 200, type: [UsuarioDto] })
    @Get()
    async listarUsuarios() {
        const result = await this.listarUsuariosUseCase.execute()

        return super.buildResponse({ result })
    }

    @ApiSecurity('accessToken')
    @ApiOperation({ summary: 'Lista um usuário pelo email ou nome de usuário' })
    @ApiResponse({ status: 200, type: UsuarioDto })
    @ApiParam({ name: 'emailOuUsuario', type: String })
    @Get('/:emailOuUsuario')
    async listarUsuarioPorId(@Param('emailOuUsuario') emailOuUsuario: string) {
        const result = await this.listarUsuarioUseCase.execute(emailOuUsuario)

        return super.buildResponse({ result })
    }

    @ApiSecurity('accessToken')
    @ApiOperation({ summary: 'Atualiza um usuário no sistema' })
    @ApiBody({ type: AtualizarUsuarioDto })
    @ApiResponse({
        status: 200,
        description: 'Usuário atualizado com sucesso.',
    })
    @ApiParam({ name: 'id', type: String })
    @Put('/:id')
    async atualizarUsuario(
        @Body() params: AtualizarUsuarioDto,
        @Param('id') id: number,
    ) {
        const result = await this.atualizarUsuarioUseCase.execute(id, params)

        return super.buildResponse({ result })
    }

    @ApiSecurity('accessToken')
    @ApiOperation({ summary: 'Deleta um usuário do sistema' })
    @ApiResponse({
        status: 200,
        description: 'Usuário deletado com sucesso.',
    })
    @ApiParam({ name: 'nomeUsuario', type: String })
    @Delete('/:nomeUsuario')
    async deletarUsuario(@Param('nomeUsuario') nomeUsuario: string) {
        const result = await this.deletarUsuarioUseCase.execute(nomeUsuario)
        return super.buildResponse({ result })
    }

    @Public()
    @ApiOperation({ summary: 'Ativa uma conta de usuário' })
    @ApiResponse({
        status: 200,
        description: 'Usuário ativado com sucesso.',
    })
    @ApiParam({ name: 'nomeUsuario', type: String })
    @Get('/ativar-conta/:nomeUsuario')
    async ativarUsuario(@Param('nomeUsuario') nomeUsuario: string) {
        const result = await this.ativarContaUsuarioUsecase.execute(nomeUsuario)
        return super.buildResponse({ result })
    }
}
