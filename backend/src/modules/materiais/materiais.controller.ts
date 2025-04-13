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
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'

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

const httpCodeMap: HttpCodeMap = {
    PropriedadesInvalidasExcecao: 400,
    RepositorioExcecao: 500,
    ServicoExcecao: 500,
}

@Controller('material')
export class MaterialController extends AbstractController {
    constructor(
        private readonly uploadFileUseCase: UploadFileUsecase,
        private readonly criarMaterialUseCase: CriarMaterialUsecase,
        private readonly downloadFileQuery: DownloadFileQuery,
        private readonly deletarArquivoUseCase: DeletarArquivoUseCase,
        private readonly deletarMaterialUseCase: DeletarMaterialUseCase,
    ) {
        const httpResponseConfig: HttpResponseConfig = {
            httpCodeMap,
            defaultHttpCodeErrors: 500,
        }
        super(httpResponseConfig)
    }

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

    @Post('criar')
    async criarMaterial(@Body() material: CriarMaterialDTO) {
        const result = await this.criarMaterialUseCase.execute(material)
        if (result.ehFalha()) {
            return ResultadoUtil.falha(result.erro)
        }

        return super.buildResponse({ result })
    }

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

    @Public()
    @Delete('delete/arquivo/:material_id')
    async deleteFile(@Param('material_id') material_id: number) {
        const result = await this.deletarArquivoUseCase.execute(material_id)
        if (result.ehFalha()) {
            return ResultadoUtil.falha(result.erro)
        }
        return super.buildResponse({ result })
    }

    @Public()
    @Delete('delete/:material_id')
    async deleteMaterial(@Param('material_id') material_id: number) {
        const result = await this.deletarMaterialUseCase.execute(material_id)
        if (result.ehFalha()) {
            return ResultadoUtil.falha(result.erro)
        }
        return super.buildResponse({ result })
    }
}
