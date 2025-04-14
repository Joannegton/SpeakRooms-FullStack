import { Injectable } from '@nestjs/common'
import axios from 'axios'
import * as FormData from 'form-data'
import { ServicoExcecao } from 'src/utils/exception'
import { ResultadoAssincrono, ResultadoUtil } from 'src/utils/result'

type ArquivoVerificado = {
    limpo: boolean
    hash: string
}

@Injectable()
export class VirusTotalService {
    constructor() {
        this.apiKey = process.env.VIRUS_TOTAL_API_KEY
        this.url = 'https://www.virustotal.com/api/v3/files'
    }

    private apiKey: string
    private url: string

    async verificarVirus(
        file: Express.Multer.File,
    ): ResultadoAssincrono<ServicoExcecao, ArquivoVerificado> {
        const formData = new FormData()
        formData.append('file', file.buffer, file.originalname)

        const headers = {
            ...formData.getHeaders(),
            'x-apikey': this.apiKey,
        }

        try {
            const response = await axios.post(this.url, formData, { headers })
            if (response.status !== 200) throw new ServicoExcecao()

            const analiseResult = await axios.get(
                `https://www.virustotal.com/api/v3/analyses/${response.data.data.id}`,
                {
                    headers: {
                        accept: 'application/json',
                        'x-apikey': this.apiKey,
                    },
                },
            )
            if (analiseResult.status !== 200) throw new ServicoExcecao()

            const { attributes } = analiseResult.data.data
            const { sha256 } = analiseResult.data.meta.file_info

            const stats = attributes.stats
            const infectado = stats.malicious > 0 || stats.suspicious > 0

            if (infectado) {
                return ResultadoUtil.falha(
                    new ServicoExcecao('Arquivo infectado detectado'),
                )
            }

            return ResultadoUtil.sucesso({ limpo: true, hash: sha256 })
        } catch (error) {
            if (error.status === 401) {
                console.error(
                    'Erro de autenticação na API do VirusTotal:',
                    error,
                )
                return ResultadoUtil.falha(
                    new ServicoExcecao(
                        'Erro de autenticação na API do VirusTotal',
                    ),
                )
            }

            return ResultadoUtil.falha(
                new ServicoExcecao('Erro ao verificar o arquivo'),
            )
        }
    }
}
