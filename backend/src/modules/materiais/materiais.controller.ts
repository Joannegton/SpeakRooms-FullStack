import {
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
    Body,
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
    ) {
        const httpResponseConfig: HttpResponseConfig = {
            httpCodeMap,
            defaultHttpCodeErrors: 500,
        }
        super(httpResponseConfig)
    }

    @Post('upload')
    @Public()
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

    @Public()
    @Post('criar')
    async criarMaterial(@Body() material: CriarMaterialDTO) {
        const result = await this.criarMaterialUseCase.execute(material)
        if (result.ehFalha()) {
            return ResultadoUtil.falha(result.erro)
        }

        return super.buildResponse({ result })
    }
}
