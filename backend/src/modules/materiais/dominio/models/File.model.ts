import { PropriedadesInvalidasExcecao } from 'src/utils/exception'
import { Resultado, ResultadoUtil } from 'src/utils/result'

export class File {
    private _id: number
    private _material_id: number
    private _usuario_id: number
    private _cloudinary_id: string
    private _url: string
    private _tipo_arquivo: string
    private _tamanho_arquivo: number
    private _enviado_em: Date

    constructor(id?: number) {
        this._id = id
    }

    /**
     * Método estático para criar uma nova instância de Files.
     * @param material_id ID do material associado.
     * @param public_id ID do arquivo no Cloudinary.
     * @param url URL do arquivo.
     * @param tipo_arquivo Tipo MIME do arquivo.
     * @param tamanho_arquivo Tamanho do arquivo em bytes.
     * @param material_id ID do usuário que fez o upload.
     * @returns Resultado contendo a instância de Files ou uma exceção.
     */
    static criar(
        material_id: number,
        usuario_id: number,
        public_id: string,
        url: string,
        tipo_arquivo: string,
        tamanho_arquivo: number,
    ): Resultado<PropriedadesInvalidasExcecao, File> {
        const file = new File()
        const setPublicId = file.setCloudinary_id(public_id)
        const setMaterialId = file.setMaterialId(material_id)
        const setTipoArquivo = file.setTipoArquivo(tipo_arquivo)
        const setTamanhoArquivo = file.setTamanhoArquivo(tamanho_arquivo)
        const setUrl = file.setUrl(url)
        const setUsuarioId = file.setUsuarioId(usuario_id)

        return ResultadoUtil.obterResultado(
            [
                setPublicId,
                setMaterialId,
                setTipoArquivo,
                setTamanhoArquivo,
                setUrl,
                setUsuarioId,
            ],
            file,
        )
    }

    static carregar(
        id: number,
        material_id: number,
        usuario_id: number,
        cloudinary_id: string,
        url: string,
        tipo_arquivo: string,
        tamanho_arquivo: number,
        enviado_em?: Date,
    ): Resultado<PropriedadesInvalidasExcecao, File> {
        const resultado = new File(id)
        const resultadoValidacao = resultado.validar()
        if (resultadoValidacao.ehFalha())
            return ResultadoUtil.falha(resultadoValidacao.erro)

        const setMaterialId = resultado.setMaterialId(material_id)
        const setUsuarioId = resultado.setUsuarioId(usuario_id)
        const setCloudinary_id = resultado.setCloudinary_id(cloudinary_id)
        const setUrl = resultado.setUrl(url)
        const setTipoArquivo = resultado.setTipoArquivo(tipo_arquivo)
        const setTamanhoArquivo = resultado.setTamanhoArquivo(tamanho_arquivo)
        const setEnviadoEm = resultado.setEnviadoEm(enviado_em)

        return ResultadoUtil.obterResultado(
            [
                setMaterialId,
                setUsuarioId,
                setCloudinary_id,
                setUrl,
                setTipoArquivo,
                setTamanhoArquivo,
                setEnviadoEm,
            ],
            resultado,
        )
    }

    /**
     * Valida todas as propriedades da entidade.
     * @returns Resultado indicando sucesso ou falha na validação.
     */
    validar(): Resultado<PropriedadesInvalidasExcecao, void> {
        const resultados = [
            this.setMaterialId(this._material_id),
            this.setCloudinary_id(this._cloudinary_id),
            this.setUrl(this._url),
            this.setTipoArquivo(this._tipo_arquivo),
            this.setTamanhoArquivo(this._tamanho_arquivo),
            this.setEnviadoEm(this._enviado_em),
        ]

        return ResultadoUtil.obterResultado(resultados, undefined)
    }

    private setTipoArquivo(
        tipo_arquivo: string,
    ): Resultado<PropriedadesInvalidasExcecao, void> {
        const tiposImagem = ['jpeg', 'png']
        const tiposPermitidos = [...tiposImagem, 'pdf', 'vnd.ms-powerpoint'] // arrumar

        if (!tipo_arquivo || !tiposPermitidos.includes(tipo_arquivo)) {
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao(
                    `tipo_arquivo inválido. Tipos permitidos: ${tiposPermitidos.join(', ')}`,
                ),
            )
        }

        this._tipo_arquivo = tipo_arquivo
        return ResultadoUtil.sucesso()
    }

    atualizarUrl(
        novaUrl: string,
    ): Resultado<PropriedadesInvalidasExcecao, void> {
        if (!this.validarUrl(novaUrl)) {
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao('URL inválida'),
            )
        }

        this._url = novaUrl
        return ResultadoUtil.sucesso()
    }

    private validarUrl(url: string): boolean {
        try {
            const parsedUrl = new URL(url)
            return parsedUrl.protocol === 'https:'
        } catch (error) {
            console.error('Erro ao validar URL:', error)
            return false
        }
    }

    private setUrl(url: string): Resultado<PropriedadesInvalidasExcecao, void> {
        if (!url) {
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao('url inválida.'),
            )
        }
        this._url = url
        return ResultadoUtil.sucesso()
    }

    private setMaterialId(
        material_id: number,
    ): Resultado<PropriedadesInvalidasExcecao, void> {
        if (!material_id) {
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao('ID Material inválido.'),
            )
        }

        this._material_id = material_id
        return ResultadoUtil.sucesso()
    }

    private setCloudinary_id(
        cloudinary_id: string,
    ): Resultado<PropriedadesInvalidasExcecao, void> {
        if (!cloudinary_id) {
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao('Cloudinary ID inválido.'),
            )
        }
        this._cloudinary_id = cloudinary_id
        return ResultadoUtil.sucesso()
    }

    private setTamanhoArquivo(
        tamanho_arquivo: number,
    ): Resultado<PropriedadesInvalidasExcecao, void> {
        if (!tamanho_arquivo) {
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao('tamanho_arquivo'),
            )
        }
        this._tamanho_arquivo = tamanho_arquivo
        return ResultadoUtil.sucesso()
    }

    private setEnviadoEm(
        enviado_em: Date,
    ): Resultado<PropriedadesInvalidasExcecao, void> {
        if (!enviado_em) {
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao('enviado_em'),
            )
        }
        this._enviado_em = enviado_em
        return ResultadoUtil.sucesso()
    }

    private setUsuarioId(
        usuario_id: number,
    ): Resultado<PropriedadesInvalidasExcecao, void> {
        if (!usuario_id) {
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao('usuario_id'),
            )
        }
        this._usuario_id = usuario_id
        return ResultadoUtil.sucesso()
    }

    get usuario_id(): number {
        return this._usuario_id
    }

    get id(): number {
        return this._id
    }
    get material_id(): number {
        return this._material_id
    }
    get cloudinary_id(): string {
        return this._cloudinary_id
    }
    get url(): string {
        return this._url
    }
    get tipo_arquivo(): string {
        return this._tipo_arquivo
    }
    get tamanho_arquivo(): number {
        return this._tamanho_arquivo
    }
    get enviado_em(): Date {
        return this._enviado_em
    }
}
