import { PropriedadesInvalidasExcecao } from 'src/utils/exception'
import { Resultado, ResultadoUtil } from 'src/utils/result'

interface CriarSessaoAprendizagemProps {
    criador_email_zoom: string
    titulo: string
    descricao?: string
    participantes_id: number[]
    dataHoraInicio: Date
    dataHoraFim: Date
    linkVideo: string
    status: 'agendada' | 'concluida' | 'cancelada'
}

interface CarregarSessaoAprendizagemProps extends CriarSessaoAprendizagemProps {
    id: number
    criadoEm: Date
    atualizadoEm: Date
}

export class SessaoAprendizagem {
    private _id: number
    private _criador_email_zoom: string
    private _titulo: string
    private _descricao?: string
    private _participantes_id: number[]
    private _dataHoraInicio: Date
    private _dataHoraFim: Date
    private _linkVideo: string
    private _status: 'agendada' | 'concluida' | 'cancelada'
    private _criadoEm: Date
    private _atualizadoEm: Date

    private constructor(id?: number) {
        this._id = id
    }

    static criar(
        props: CriarSessaoAprendizagemProps,
    ): Resultado<PropriedadesInvalidasExcecao, SessaoAprendizagem> {
        const sessao = new SessaoAprendizagem()
        const setCriadorEmailZoom = sessao.setCriadorEmailZoom(
            props.criador_email_zoom,
        )
        const setTitulo = sessao.setTitulo(props.titulo)
        const setDescricao = sessao.setDescricao(props.descricao)
        const setParticipantesId = sessao.setParticipantesId(
            props.participantes_id,
        )
        const setDataHoraInicio = sessao.setDataHoraInicio(props.dataHoraInicio)
        const setDataHoraFim = sessao.setDataHoraFim(props.dataHoraFim)
        const setLinkVideo = sessao.setLinkVideo(props.linkVideo)
        const setStatus = sessao.setStatus(props.status)

        return ResultadoUtil.obterResultado(
            [
                setCriadorEmailZoom,
                setTitulo,
                setDescricao,
                setParticipantesId,
                setDataHoraInicio,
                setDataHoraFim,
                setLinkVideo,
                setStatus,
            ],
            sessao,
        )
    }

    static carregar(
        props: CarregarSessaoAprendizagemProps,
    ): Resultado<PropriedadesInvalidasExcecao, SessaoAprendizagem> {
        const sessao = new SessaoAprendizagem(props.id)
        const setCriadorEmailZoom = sessao.setCriadorEmailZoom(
            props.criador_email_zoom,
        )
        const setTitulo = sessao.setTitulo(props.titulo)
        const setDescricao = sessao.setDescricao(props.descricao)
        const setParticipantesId = sessao.setParticipantesId(
            props.participantes_id,
        )
        const setDataHoraInicio = sessao.setDataHoraInicio(props.dataHoraInicio)
        const setDataHoraFim = sessao.setDataHoraFim(props.dataHoraFim)
        const setLinkVideo = sessao.setLinkVideo(props.linkVideo)
        const setStatus = sessao.setStatus(props.status)
        const setCriadoEm = sessao.setCriadoEm(props.criadoEm)
        const setAtualizadoEm = sessao.setAtualizadoEm(props.atualizadoEm)

        return ResultadoUtil.obterResultado(
            [
                setCriadorEmailZoom,
                setTitulo,
                setDescricao,
                setParticipantesId,
                setDataHoraInicio,
                setDataHoraFim,
                setLinkVideo,
                setStatus,
                setCriadoEm,
                setAtualizadoEm,
            ],
            sessao,
        )
    }

    private setCriadorEmailZoom(
        criador_email_zoom: string,
    ): Resultado<PropriedadesInvalidasExcecao, void> {
        if (!criador_email_zoom) {
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao('Criador inválido'),
            )
        }
        this._criador_email_zoom = criador_email_zoom
        return ResultadoUtil.sucesso()
    }

    private setTitulo(
        titulo: string,
    ): Resultado<PropriedadesInvalidasExcecao, void> {
        if (!titulo) {
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao('Título inválido'),
            )
        }
        this._titulo = titulo
        return ResultadoUtil.sucesso()
    }

    private setDescricao(
        descricao?: string,
    ): Resultado<PropriedadesInvalidasExcecao, void> {
        if (descricao && descricao.length > 255) {
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao('Descrição inválida'),
            )
        }
        this._descricao = descricao
        return ResultadoUtil.sucesso()
    }

    private setParticipantesId(
        participantes_id: number[],
    ): Resultado<PropriedadesInvalidasExcecao, void> {
        if (!Array.isArray(participantes_id)) {
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao('Participantes inválidos'),
            )
        }
        this._participantes_id = participantes_id
        return ResultadoUtil.sucesso()
    }

    private setDataHoraInicio(
        dataHoraInicio: Date,
    ): Resultado<PropriedadesInvalidasExcecao, void> {
        if (!dataHoraInicio) {
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao(
                    'Data e hora de início inválidas',
                ),
            )
        }
        this._dataHoraInicio = dataHoraInicio
        return ResultadoUtil.sucesso()
    }

    private setDataHoraFim(
        dataHoraFim: Date,
    ): Resultado<PropriedadesInvalidasExcecao, void> {
        if (!dataHoraFim) {
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao(
                    'Data e hora de fim inválidas',
                ),
            )
        }
        this._dataHoraFim = dataHoraFim
        return ResultadoUtil.sucesso()
    }

    private setLinkVideo(
        linkVideo: string,
    ): Resultado<PropriedadesInvalidasExcecao, void> {
        if (!linkVideo) {
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao('Link de vídeo inválido'),
            )
        }
        this._linkVideo = linkVideo
        return ResultadoUtil.sucesso()
    }

    private setStatus(
        status: 'agendada' | 'concluida' | 'cancelada',
    ): Resultado<PropriedadesInvalidasExcecao, void> {
        if (!status) {
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao('Status inválido'),
            )
        }
        this._status = status
        return ResultadoUtil.sucesso()
    }

    private setCriadoEm(
        criadoEm: Date,
    ): Resultado<PropriedadesInvalidasExcecao, void> {
        if (!criadoEm) {
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao('Data de criação inválida'),
            )
        }
        this._criadoEm = criadoEm
        return ResultadoUtil.sucesso()
    }

    private setAtualizadoEm(
        atualizadoEm: Date,
    ): Resultado<PropriedadesInvalidasExcecao, void> {
        if (!atualizadoEm) {
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao(
                    'Data de atualização inválida',
                ),
            )
        }
        this._atualizadoEm = atualizadoEm
        return ResultadoUtil.sucesso()
    }

    get id(): number {
        return this._id
    }
    get criadorEmailZoom(): string {
        return this._criador_email_zoom
    }
    get titulo(): string {
        return this._titulo
    }
    get descricao(): string | undefined {
        return this._descricao
    }
    get participantes_id(): number[] {
        return this._participantes_id
    }
    get dataHoraInicio(): Date {
        return this._dataHoraInicio
    }
    get dataHoraFim(): Date {
        return this._dataHoraFim
    }
    get linkVideo(): string {
        return this._linkVideo
    }
    get status(): 'agendada' | 'concluida' | 'cancelada' {
        return this._status
    }
    get criadoEm(): Date {
        return this._criadoEm
    }
    get atualizadoEm(): Date {
        return this._atualizadoEm
    }
}
