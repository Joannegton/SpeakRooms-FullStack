import { Injectable } from '@nestjs/common'
import {
    v2 as cloudinary,
    UploadApiErrorResponse,
    UploadApiResponse,
} from 'cloudinary'
import * as dotenv from 'dotenv'
import { ServicoExcecao } from 'http-service-result'
import { ResultadoAssincrono, ResultadoUtil } from 'http-service-result'
import { VirusTotalService } from './VirusTotal.service'

dotenv.config()

@Injectable()
export class CloudinaryService {
    constructor(private readonly virusTotalService: VirusTotalService) {
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET,
            secure: true,
        })
    }

    /**
     * Realiza o upload de um arquivo no Cloudinary.
     * Antes do upload, verifica se o arquivo está limpo de vírus e se atende ao tamanho máximo permitido.
     * @param file Arquivo recebido via Multer.
     * @returns Resultado do upload contendo os dados do arquivo no Cloudinary ou uma falha.
     */
    async uploadNoCloudinary(
        file: Express.Multer.File,
    ): ResultadoAssincrono<ServicoExcecao, UploadApiResponse> {
        try {
            const tamanhoMaximo = 4 * 1024 * 1024 // 4MB
            if (file.size > tamanhoMaximo) {
                return ResultadoUtil.falha(
                    new ServicoExcecao('Tamanho máximo de 4MB'),
                )
            }

            const verificarVirus =
                await this.virusTotalService.verificarVirus(file)
            if (verificarVirus.ehFalha()) {
                return ResultadoUtil.falha(verificarVirus.erro)
            }

            if (!verificarVirus.valor.limpo) {
                return ResultadoUtil.falha(
                    new ServicoExcecao('Arquivo infectado detectado'),
                )
            }

            const result = await new Promise<UploadApiResponse>(
                (resolve, reject) => {
                    cloudinary.uploader
                        .upload_stream(
                            {
                                // adicionar pptx e ppt https://cloudinary.com/documentation/upload_images
                                resource_type: 'auto',
                                folder: 'speackRoomFiles',
                                public_id: file.originalname,
                                allowed_formats: ['jpg', 'png', 'pdf'],
                                transformation: [
                                    {
                                        width: 800,
                                        height: 800,
                                        crop: 'limit',
                                    },
                                ],
                            },
                            (
                                error: UploadApiErrorResponse,
                                result: UploadApiResponse,
                            ) => {
                                if (error) return reject(error)
                                resolve(result)
                            },
                        )
                        .end(file.buffer)
                },
            )

            return ResultadoUtil.sucesso(result)
        } catch (error) {
            console.error('Erro ao fazer upload no Cloudinary:', error)
            return ResultadoUtil.falha(
                new ServicoExcecao(error.message || 'Erro ao fazer upload'),
            )
        }
    }

    async deleteFileFromCloudinary(
        publicId: string,
    ): ResultadoAssincrono<ServicoExcecao, string> {
        try {
            const result = await cloudinary.uploader.destroy(publicId)
            return ResultadoUtil.sucesso(result.result)
        } catch (error) {
            console.error('Erro ao deletar arquivo do Cloudinary:', error)
            return ResultadoUtil.falha(
                new ServicoExcecao(error.message || 'Erro ao deletar arquivo'),
            )
        }
    }
}
