import { Response } from 'express'
import axios from 'axios'

// arrumar
export class FileResponseUtil {
    static async sendFile(
        res: Response,
        fileUrl: string,
        fileName: string,
        fileType: string,
    ): Promise<void> {
        try {
            // Configura os cabeçalhos para o download
            res.setHeader(
                'Content-Disposition',
                `attachment; filename="${fileName}"`,
            )
            res.setHeader('Content-Type', fileType)

            // Faz o download do arquivo usando a URL
            const response = await axios.get(fileUrl, {
                responseType: 'stream',
            })

            // Envia o arquivo como resposta
            response.data.pipe(res)
        } catch (error) {
            console.error('Erro ao enviar o arquivo:', error)
            throw new Error('Erro ao enviar o arquivo')
        }
    }
}
