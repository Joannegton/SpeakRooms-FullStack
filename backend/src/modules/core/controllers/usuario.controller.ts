import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { SalvarUsuarioUseCase } from '../application/useCases/SalvarUsuario.usecase'
import { UsuarioDto } from '../application/dtos/Usuario.dto'
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

const httpCodeMap: HttpCodeMap = {
    PropriedadesInvalidasExcecao: 400,
    RepositorioExcecao: 500,
}

@Controller('usuario')
export class UsuarioController extends AbstractController {
    constructor(
        private readonly salvarUsuarioUseCase: SalvarUsuarioUseCase,
        private readonly listarUsuarioUseCase: BuscarUsuarioQuery,
        private readonly listarUsuariosUseCase: BuscarUsuariosQuery,
        private readonly atualizarUsuarioUseCase: AtualizarUsuarioUseCase,
        private readonly deletarUsuarioUseCase: DeletarUsuarioUseCase,
    ) {
        const httpResponseConfig: HttpResponseConfig = {
            httpCodeMap,
            defaultHttpCodeErrors: 500,
        }
        super(httpResponseConfig)
    }

    @Public()
    @Post('/cadastro')
    async salvarUsuario(@Body() params: UsuarioDto) {
        const result = await this.salvarUsuarioUseCase.execute(params)

        return super.buildResponse({ result })
    }

    @Get()
    async listarUsuarios() {
        const result = await this.listarUsuariosUseCase.execute()

        return super.buildResponse({ result })
    }

    @Get('/:emailOuUsuario')
    async listarUsuarioPorId(@Param('emailOuUsuario') emailOuUsuario: string) {
        const result = await this.listarUsuarioUseCase.execute(emailOuUsuario)

        return super.buildResponse({ result })
    }

    @Put('/atualizar/:id')
    async atualizarUsuario(@Body() params: UsuarioDto) {
        const result = await this.atualizarUsuarioUseCase.execute(params)

        return super.buildResponse({ result })
    }

    @Delete('/deletar/:nomeUsuario')
    async deletarUsuario(@Param('nomeUsuario') nomeUsuario: string) {
        const result = await this.deletarUsuarioUseCase.execute(nomeUsuario)

        return super.buildResponse({ result })
    }
}
