import { google } from 'googleapis'
import * as dotenv from 'dotenv'
import axios from 'axios'
import { ResultadoAssincrono, ResultadoUtil } from 'src/utils/result'
import { ServicoExcecao } from 'src/utils/exception'

dotenv.config()

const REDIRECT_URI = 'http://localhost:3000/oauth/callback' // Substitua pela URI correta

type ZoomReuniaoResult = {
    join_url: string
    linkHost: string
    data: Date
}

export const zoomOAuthConfig = {
    clientId: process.env.ZOOM_CLIENT_ID,
    clientSecret: process.env.ZOOM_CLIENT_SECRET,
    accountId: process.env.ZOOM_ACCOUNT_ID,
    baseUrl: 'https://api.zoom.us/v2',
    authUrl: 'https://zoom.us/oauth/token',
}

export class OAuthService {
    private accessToken: string | null = null
    private expiresAt: number = 0

    gerarLinkAutenticacao(): string {
        const oauth2Client = new google.auth.OAuth2(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            REDIRECT_URI,
        )

        // URL para o usuário fazer login e autorizar o acesso
        const authUrl = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: ['https://www.googleapis.com/auth/calendar.events'],
        })

        return authUrl // Retorna a URL de autenticação para o frontend
    }

    gerarLinkAutenticacaoZoom(): string {
        const clientId = process.env.ZOOM_CLIENT_ID
        const redirectUri = 'http://localhost:3000/oauth/callback' // Substitua pelo seu REDIRECT_URI
        const authUrl = `https://zoom.us/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`
        return authUrl // Retorna o link de autenticação do Zoom
    }

    async obterToken(code: string): Promise<string> {
        const oauth2Client = new google.auth.OAuth2(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            REDIRECT_URI,
        )

        // Troca o código de autorização pelo token de acesso
        const { tokens } = await oauth2Client.getToken(code)

        if (!tokens.access_token) {
            throw new Error('Token de acesso não encontrado.')
        }

        return tokens.access_token // Retorna o token de acesso
    }

    async gerarLinkMeet(
        token: string, // Token de acesso do usuário
        titulo: string, // Título do evento
        dataHoraInicio: Date, // Data e hora de início do evento
        descricao?: string, // Descrição opcional do evento
    ): Promise<string> {
        const oauth2Client = new google.auth.OAuth2(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            REDIRECT_URI,
        )

        oauth2Client.setCredentials({ access_token: token }) // Configura o token de acesso

        const calendar = google.calendar({ version: 'v3', auth: oauth2Client }) // Instancia o serviço do Google Calendar

        const event = {
            summary: titulo, // Define o título do evento
            description: descricao || 'Reunião criada automaticamente.', // Define a descrição do evento
            start: {
                dateTime: dataHoraInicio.toISOString(), // Define a data e hora de início
                timeZone: 'America/Sao_Paulo', // Define o fuso horário
            },
            end: {
                dateTime: new Date(
                    dataHoraInicio.getTime() + 60 * 60 * 1000, // Define a data e hora de término (1 hora após o início)
                ).toISOString(),
                timeZone: 'America/Sao_Paulo',
            },
            conferenceData: {
                createRequest: {
                    requestId: 'random-string', // Identificador único para a reunião
                    conferenceSolutionKey: { type: 'hangoutsMeet' }, // Define o tipo de conferência (Google Meet)
                },
            },
        }

        // Insere o evento no calendário do usuário
        const response = await calendar.events.insert({
            calendarId: 'primary', // Insere no calendário principal do usuário
            conferenceDataVersion: 1, // Necessário para criar o link do Meet
            requestBody: event, // Corpo da requisição com os dados do evento
        })

        return response.data.hangoutLink || '' // Retorna o link do Google Meet
    }

    async obterTokenZoom(): ResultadoAssincrono<ServicoExcecao, string> {
        const agora = Date.now()

        if (this.accessToken && this.expiresAt > agora) {
            return ResultadoUtil.sucesso(this.accessToken)
        }

        const credentials = Buffer.from(
            `${zoomOAuthConfig.clientId}:${zoomOAuthConfig.clientSecret}`,
        ).toString('base64')

        const url = `${zoomOAuthConfig.authUrl}?grant_type=account_credentials&account_id=${zoomOAuthConfig.accountId}`
        try {
            const response = await axios.post(
                url,
                {},
                {
                    headers: {
                        Authorization: `Basic ${credentials}`,
                    },
                },
            )
            this.accessToken = response.data.access_token
            this.expiresAt = agora + response.data.expires_in * 1000

            return ResultadoUtil.sucesso(this.accessToken) // Retorna o token de acesso
        } catch (error) {
            console.error('Erro ao obter token do Zoom:', error)
            return ResultadoUtil.falha(
                new ServicoExcecao('Erro ao obter token de acesso do Zoom'),
            )
        }
    }

    async obterUsuarioZoom(): ResultadoAssincrono<ServicoExcecao, string> {
        if (!this.accessToken) {
            const token = await this.obterTokenZoom()
            if (token.ehFalha()) {
                return ResultadoUtil.falha(token.erro)
            }
            this.accessToken = token.valor
        }

        const url = `${zoomOAuthConfig.baseUrl}/users/me`
        const headers = {
            Authorization: `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
        }

        try {
            const response = await axios.get(url, { headers })
            return ResultadoUtil.sucesso(response.data.id)
        } catch (error) {
            console.error(
                'Erro ao obter usuário do Zoom:',
                error.response?.data?.message || error.message,
            )
            return ResultadoUtil.falha(
                new ServicoExcecao(
                    error.response?.data?.message ||
                        'Erro ao obter usuário do Zoom',
                ),
            )
        }
    }

    async gerarReuniaoZoom(
        usuario: string, // usuário do Zoom
        titulo: string, // Título da reunião
        dataHoraInicio: Date, // Data e hora de início da reunião
        duracao: number = 40, // Duração da reunião em minutos
    ): ResultadoAssincrono<ServicoExcecao, ZoomReuniaoResult> {
        if (!this.accessToken) {
            const token = await this.obterTokenZoom() // Obtém o token de acesso se não estiver definido
            if (token.ehFalha()) {
                return ResultadoUtil.falha(token.erro) // Retorna erro se falhar ao obter o token
            }
            this.accessToken = token.valor // Armazena o token de acesso
        }
        const url = `${zoomOAuthConfig.baseUrl}/users/${usuario}/meetings`

        const meetingData = {
            topic: titulo, // Título da reunião
            type: 2, // Tipo de reunião (2 = agendada)
            start_time: dataHoraInicio, // Data e hora de início
            duration: duracao, // Duração em minutos
            timezone: 'America/Sao_Paulo', // Fuso horário
            settings: {
                join_before_host: true, // Permitir que os participantes entrem antes do anfitrião
                mute_upon_entry: true, // Silenciar participantes ao entrar
                waiting_room: false, // Desativar sala de espera
            },
        }

        const headers = {
            Authorization: `Bearer ${this.accessToken}`, // Token de acesso do Zoom
            'Content-Type': 'application/json',
        }

        try {
            const response = await axios.post(url, meetingData, { headers })
            return ResultadoUtil.sucesso(response.data) // Retorna o link da reunião
        } catch (error) {
            console.error(
                'Erro ao criar reunião:',
                error.response?.data?.message || error.message,
            )
            return ResultadoUtil.falha(
                new ServicoExcecao(
                    error.response?.data?.message ||
                        'Erro ao criar reunião no Zoom',
                ),
            )
        }
    }
}
