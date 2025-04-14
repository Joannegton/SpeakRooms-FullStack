import {
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
    Body,
    Param,
    HttpException,
    HttpStatus,
    Res,
    Get,
    Delete,
    Query,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiConsumes,
    ApiProduces,
    ApiBody,
} from '@nestjs/swagger'

import { ResultadoUtil } from 'src/utils/result'

import {
    AbstractController,
    HttpCodeMap,
    HttpResponseConfig,
} from 'src/utils/AbstractControler'
import { UploadFileUsecase } from './application/usecases/UploadFile.usecase'
import { UploadFileDTO } from './application/dtos/FIle.dto'
import { Public } from 'src/decorators/public.decorator'
import { CriarMaterialDTO } from './application/dtos/Material.dto'
import { CriarMaterialUsecase } from './application/usecases/CriarMaterial.usecase'
import { DownloadFileQuery } from './application/queries/downloadFile.query'
import { Response } from 'express'
import { DeletarArquivoUseCase } from './application/usecases/DeletarArquivo.usecase'
import { DeletarMaterialUseCase } from './application/usecases/DeletarMaterial.usecase'
import { buscarMaterialPorIdQuery } from './application/queries/BuscarMaterialID.useCase'
import { BuscarMateriaisCategoriaQuery } from './application/queries/BuscarMateriaisCategoria.useCase'
import { BuscarMateriaisNivelQuery } from './application/queries/BuscarMateriaisNivel.useCase'
import { BuscarMateriaisUsuarioQuery } from './application/queries/BuscarMateriaisUsuario.useCase'

const httpCodeMap: HttpCodeMap = {
    PropriedadesInvalidasExcecao: 400,
    NaoAutorizadoException: 401,
    RepositorioExcecao: 500,
    ServicoExcecao: 500,
}

@ApiResponse({ status: 400, description: 'Propriedades invalidas' })
@ApiResponse({ status: 401, description: 'Não autorizado' })
@ApiResponse({ status: 500, description: 'Erro interno no servidor.' })
@ApiTags('Material')
@Controller('material')
export class MaterialController extends AbstractController {
    constructor(
        private readonly uploadFileUseCase: UploadFileUsecase,
        private readonly criarMaterialUseCase: CriarMaterialUsecase,
        private readonly downloadFileQuery: DownloadFileQuery,
        private readonly deletarArquivoUseCase: DeletarArquivoUseCase,
        private readonly deletarMaterialUseCase: DeletarMaterialUseCase,
        private readonly buscarMaterialPorIdQuery: buscarMaterialPorIdQuery,
        private readonly buscarMateriaisUsuarioQuery: BuscarMateriaisUsuarioQuery,
        private readonly buscarMateriaisCategoriaQuery: BuscarMateriaisCategoriaQuery,
        private readonly buscarMateriaisNivelQuery: BuscarMateriaisNivelQuery,
    ) {
        const httpResponseConfig: HttpResponseConfig = {
            httpCodeMap,
            defaultHttpCodeErrors: 500,
        }
        super(httpResponseConfig)
    }

    @ApiResponse({ status: 200, description: 'Arquivo enviado com sucesso.' })
    @ApiOperation({ summary: 'Faz o upload de um arquivo.' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'Dados necessários para o upload do arquivo.',
        schema: {
            type: 'object',
            properties: {
                arquivo: {
                    type: 'string',
                    format: 'binary',
                    description: 'O arquivo a ser enviado.',
                },
                material_id: {
                    type: 'number',
                    description: 'ID do material associado ao arquivo.',
                },
                usuario_id: {
                    type: 'number',
                    description: 'ID do usuário associado ao arquivo.',
                },
            },
            required: ['arquivo', 'material_id', 'usuario_id'],
        },
    })
    @Post('upload')
    @UseInterceptors(FileInterceptor('arquivo'))
    async uploadFile(
        @UploadedFile() arquivo: Express.Multer.File,
        @Body() uploadFileDTO: UploadFileDTO,
    ) {
        const result = await this.uploadFileUseCase.execute(
            arquivo,
            uploadFileDTO,
        )
        if (result.ehFalha()) {
            return ResultadoUtil.falha(result.erro)
        }

        return super.buildResponse({ result })
    }

    @ApiOperation({ summary: 'Cria um novo material.' })
    @ApiResponse({ status: 200, description: 'Material criado com sucesso.' })
    @ApiResponse({ status: 400, description: 'Erro de validação.' })
    @ApiBody({
        description: 'Dados necessários para criar um novo material.',
        type: CriarMaterialDTO,
    })
    @ApiConsumes('application/json')
    @Post('criar')
    async criarMaterial(@Body() material: CriarMaterialDTO) {
        const result = await this.criarMaterialUseCase.execute(material)
        if (result.ehFalha()) {
            return ResultadoUtil.falha(result.erro)
        }

        return super.buildResponse({ result })
    }

    @ApiOperation({
        summary: 'Faz o download de um arquivo associado a um material.',
    })
    @ApiResponse({ status: 200, description: 'Arquivo baixado com sucesso.' })
    @ApiResponse({ status: 500, description: 'Material não encontrado.' })
    @ApiProduces('application/octet-stream')
    @Get('download/:material_id')
    async downloadFile(
        @Param('material_id') material_id: number,
        @Res() res: Response,
    ) {
        const result = await this.downloadFileQuery.execute(material_id)
        if (result.ehFalha()) {
            throw new HttpException(result.erro.message, HttpStatus.NOT_FOUND)
        }

        res.setHeader(
            'Content-Disposition',
            `attachment; filename="${result.valor.cloudinary_id}"`,
        )
        res.setHeader('Content-Type', result.valor.tipo_arquivo)

        result.valor.arquivo.data.pipe(res)
    }

    @ApiOperation({
        summary: 'Deleta um arquivo associado a um material.',
    })
    @ApiResponse({ status: 200, description: 'Arquivo deletado com sucesso.' })
    @ApiResponse({ status: 500, description: 'Material não encontrado.' })
    @Delete('delete/arquivo/:material_id')
    async deleteFile(@Param('material_id') material_id: number) {
        const result = await this.deletarArquivoUseCase.execute(material_id)
        if (result.ehFalha()) {
            return ResultadoUtil.falha(result.erro)
        }
        return super.buildResponse({ result })
    }

    @ApiOperation({
        summary: 'Deleta um material.',
    })
    @ApiResponse({ status: 200, description: 'Material deletado com sucesso.' })
    @ApiResponse({ status: 404, description: 'Material não encontrado.' })
    @Public()
    @Delete('delete/:material_id')
    async deleteMaterial(@Param('material_id') material_id: number) {
        const result = await this.deletarMaterialUseCase.execute(material_id)
        if (result.ehFalha()) {
            return ResultadoUtil.falha(result.erro)
        }
        return super.buildResponse({ result })
    }

    @ApiOperation({
        summary: 'Busca materiais por nível.',
    })
    @ApiResponse({ status: 200, description: 'Materiais encontrados.' })
    @ApiResponse({ status: 400, description: 'Erro de validação.' })
    @Public()
    @Get('buscar/nivel/')
    async buscarMateriaisPorNivel(
        @Query('niveisId') niveisId: string | string[],
    ) {
        if (typeof niveisId === 'string') {
            niveisId = niveisId.split(',').map((nivel) => nivel.trim())
        }

        const result = await this.buscarMateriaisNivelQuery.execute(niveisId)
        return super.buildResponse({ result })
    }

    @ApiOperation({
        summary: 'Busca materiais por categoria.',
    })
    @ApiResponse({ status: 200, description: 'Materiais encontrados.' })
    @ApiResponse({ status: 400, description: 'Erro de validação.' })
    @Public()
    @Get('buscar/categoria/')
    async buscarMateriaisPorCategoria(
        @Query('categorias_id') categorias_id: string | string[],
    ) {
        if (typeof categorias_id === 'string') {
            categorias_id = categorias_id
                .split(',')
                .map((categoria) => categoria.trim())
        }
        const result =
            await this.buscarMateriaisCategoriaQuery.execute(categorias_id)
        if (result.ehFalha()) {
            return ResultadoUtil.falha(result.erro)
        }
        return super.buildResponse({ result })
    }

    @ApiOperation({
        summary: 'Busca materiais por usuário.',
    })
    @ApiResponse({ status: 200, description: 'Materiais encontrados.' })
    @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
    @Public()
    @Get('buscar/usuario/:usuario_id')
    async buscarMateriaisPorUsuario(@Param('usuario_id') usuario_id: number) {
        const result =
            await this.buscarMateriaisUsuarioQuery.execute(usuario_id)
        if (result.ehFalha()) {
            return ResultadoUtil.falha(result.erro)
        }
        return super.buildResponse({ result })
    }

    @ApiOperation({
        summary: 'Busca um material por ID.',
    })
    @ApiResponse({ status: 200, description: 'Material encontrado.' })
    @ApiResponse({ status: 404, description: 'Material não encontrado.' })
    @Public()
    @Get('buscar/:material_id')
    async buscarMaterialPorId(@Param('material_id') material_id: number) {
        const result = await this.buscarMaterialPorIdQuery.execute(material_id)
        if (result.ehFalha()) {
            return ResultadoUtil.falha(result.erro)
        }
        return super.buildResponse({ result })
    }
}
