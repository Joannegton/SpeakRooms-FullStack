import { Controller, Get, Post, Query } from '@nestjs/common'
import { OAuthService } from '../services/OAuth.service'

@Controller('oauth')
export class OAuthController {
    constructor(private readonly oAuthService: OAuthService) {}

    @Get('callback')
    async handleZoomCallback(@Query('code') code: string): Promise<string> {
        if (!code) {
            throw new Error('Código de autorização não fornecido.')
        }

        // Troca o código pelo token de acesso
        const token = await this.oAuthService.obterTokenZoom()
        if (!token) {
            throw new Error('Falha ao obter o token de acesso do Zoom.')
        }

        // Retorna o token ou uma mensagem de sucesso
        return `Token de acesso do Zoom obtido com sucesso: ${token}`
    }

    @Get('link-zoom')
    async gerarLinkAuthZoom(): Promise<string> {
        // Gera o link de autenticação do Zoom
        const link = this.oAuthService.gerarLinkAutenticacaoZoom()
        return link
    }

    @Post('link-reuniao')
    async gerarLinkReuniao(
        @Query('token') token: string, // Recebe o token como parâmetro
        @Query('titulo') titulo: string,
        @Query('dataHoraInicio') dataHoraInicio: string,
    ): Promise<any> {
        if (!token) {
            throw new Error('Token de acesso não fornecido.')
        }

        // Gera o link da reunião no Zoom
        const link = await this.oAuthService.gerarReuniaoZoom(
            token, // Passa o token recebido
            titulo,
            new Date(dataHoraInicio),
        )
        return link
    }
}
