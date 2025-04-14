import { PropriedadesInvalidasExcecao } from 'src/utils/exception'
import { Resultado, ResultadoUtil } from 'src/utils/result'

/**
 * Representa um material no domínio.
 */
export class Material {
    private _id: number
    private _titulo: string
    private _descricao: string
    private _usuario_id: number
    private _nivel_id: number
    private _categoria_id: number
    private _duracao: number
    private _criado_em: Date
    private _atualizado_em: Date
    private _aprovado: boolean
    private _destaque: boolean
    private _recomendado: boolean

    private constructor(id?: number) {
        this._id = id
    }

    /**
     * Cria uma nova instância de Material.
     * @param titulo O título do material.
     * @param descricao A descrição do material.
     * @param usuario_id O ID do usuário associado ao material.
     * @param nivel_id O ID do nível associado ao material.
     * @param categoria_id O ID da categoria associada ao material.
     * @param duracao A duração do material.
     * @returns Um resultado contendo o material criado ou uma exceção em caso de falha.
     */
    static criar(
        titulo: string,
        descricao: string,
        usuario_id: number,
        nivel_id: number,
        categoria_id: number,
        duracao: number,
    ): Resultado<PropriedadesInvalidasExcecao, Material> {
        const material = new Material()
        const setTitulo = material.setTitulo(titulo)
        const setDescricao = material.setDescricao(descricao)
        const setUsuarioId = material.setUsuarioId(usuario_id)
        const setNivelId = material.setNivelId(nivel_id)
        const setCategoriaId = material.setCategoriaId(categoria_id)
        const setDuracao = material.setDuracao(duracao)

        return ResultadoUtil.obterResultado(
            [
                setTitulo,
                setDescricao,
                setUsuarioId,
                setNivelId,
                setCategoriaId,
                setDuracao,
            ],
            material,
        )
    }

    static carregar(
        id: number,
        titulo: string,
        descricao: string,
        usuario_id: number,
        nivel_id: number,
        categoria_id: number,
        duracao: number,
        criado_em: Date,
        atualizado_em: Date,
        aprovado: boolean,
        destaque: boolean,
        recomendado: boolean,
    ): Resultado<PropriedadesInvalidasExcecao, Material> {
        const material = new Material(id)
        const setTitulo = material.setTitulo(titulo)
        const setDescricao = material.setDescricao(descricao)
        const setUsuarioId = material.setUsuarioId(usuario_id)
        const setNivelId = material.setNivelId(nivel_id)
        const setCategoriaId = material.setCategoriaId(categoria_id)
        const setDuracao = material.setDuracao(duracao)
        const setCriadoEm = material.setCriadoEm(criado_em)
        const setAtualizadoEm = material.setAtualizadoEm(atualizado_em)
        const setAprovado = material.setAprovado(aprovado)
        const setDestaque = material.setDestaque(destaque)
        const setRecomendado = material.setRecomendado(recomendado)

        return ResultadoUtil.obterResultado(
            [
                setTitulo,
                setDescricao,
                setUsuarioId,
                setNivelId,
                setCategoriaId,
                setDuracao,
                setCriadoEm,
                setAtualizadoEm,
                setAprovado,
                setDestaque,
                setRecomendado,
            ],
            material,
        )
    }

    /**
     * Atualiza as propriedades do material.
     * @param titulo O novo título do material (opcional).
     * @param descricao A nova descrição do material (opcional).
     * @param duracao A nova duração do material (opcional).
     * @returns Um resultado indicando sucesso ou falha na atualização.
     */
    atualizarPropriedades(
        titulo?: string,
        descricao?: string,
        duracao?: number,
    ): Resultado<PropriedadesInvalidasExcecao, void> {
        const resultados = []
        if (titulo) resultados.push(this.setTitulo(titulo))
        if (descricao) resultados.push(this.setDescricao(descricao))
        if (duracao) resultados.push(this.setDuracao(duracao))

        return ResultadoUtil.obterResultado(resultados, undefined)
    }

    marcarComoDestaque(): void {
        this._destaque = true
    }

    desmarcarComoDestaque(): void {
        this._destaque = false
    }

    marcarComoRecomendado(): void {
        this._recomendado = true
    }

    desmarcarComoRecomendado(): void {
        this._recomendado = false
    }

    /**
     * Valida as propriedades do material.
     * @returns Um resultado indicando sucesso ou falha na validação.
     */
    validar(): Resultado<PropriedadesInvalidasExcecao, void> {
        const resultados = [
            this.setTitulo(this._titulo),
            this.setDescricao(this._descricao),
            this.setUsuarioId(this._usuario_id),
            this.setNivelId(this._nivel_id),
            this.setCategoriaId(this._categoria_id),
            this.setDuracao(this._duracao),
        ]

        return ResultadoUtil.obterResultado(resultados, undefined)
    }

    /**
     * Clona o material atual.
     * @returns Um resultado contendo o clone do material ou uma exceção em caso de falha.
     */
    clonar(): Resultado<PropriedadesInvalidasExcecao, Material> {
        const clone = Material.carregar(
            undefined,
            this._titulo,
            this._descricao,
            this._usuario_id,
            this._nivel_id,
            this._categoria_id,
            this._duracao,
            new Date(),
            new Date(),
            this._aprovado,
            this._destaque,
            this._recomendado,
        )
        if (clone.ehFalha()) {
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao('Falha ao clonar o material.'),
            )
        }

        return ResultadoUtil.sucesso(clone.valor)
    }

    private setTitulo(
        titulo: string,
    ): Resultado<PropriedadesInvalidasExcecao, void> {
        if (!titulo)
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao('O título é inválido.'),
            )
        this._titulo = titulo
        return ResultadoUtil.sucesso()
    }

    private setDescricao(
        descricao: string,
    ): Resultado<PropriedadesInvalidasExcecao, void> {
        this._descricao = descricao
        return ResultadoUtil.sucesso()
    }

    private setUsuarioId(
        usuario_id: number,
    ): Resultado<PropriedadesInvalidasExcecao, void> {
        if (!usuario_id)
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao('Usuario é inválido'),
            )
        this._usuario_id = usuario_id
        return ResultadoUtil.sucesso()
    }

    private setNivelId(
        nivel_id: number,
    ): Resultado<PropriedadesInvalidasExcecao, void> {
        if (!nivel_id)
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao('Nivel é inválido'),
            )
        this._nivel_id = nivel_id
        return ResultadoUtil.sucesso()
    }

    private setCategoriaId(
        categoria_id: number,
    ): Resultado<PropriedadesInvalidasExcecao, void> {
        if (!categoria_id)
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao('Categoria é inválido'),
            )
        this._categoria_id = categoria_id
        return ResultadoUtil.sucesso()
    }

    private setDuracao(
        duracao: number,
    ): Resultado<PropriedadesInvalidasExcecao, void> {
        this._duracao = duracao
        return ResultadoUtil.sucesso()
    }

    private setAprovado(
        aprovado: boolean,
    ): Resultado<PropriedadesInvalidasExcecao, void> {
        this._aprovado = aprovado
        return ResultadoUtil.sucesso()
    }

    private setDestaque(
        destaque: boolean,
    ): Resultado<PropriedadesInvalidasExcecao, void> {
        this._destaque = destaque
        return ResultadoUtil.sucesso()
    }

    private setRecomendado(
        recomendado: boolean,
    ): Resultado<PropriedadesInvalidasExcecao, void> {
        this._recomendado = recomendado
        return ResultadoUtil.sucesso()
    }

    private setCriadoEm(
        criado_em: Date,
    ): Resultado<PropriedadesInvalidasExcecao, void> {
        if (!criado_em)
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao(
                    'A data de criação é obrigatória.',
                ),
            )
        this._criado_em = criado_em
        return ResultadoUtil.sucesso()
    }

    private setAtualizadoEm(
        atualizado_em: Date,
    ): Resultado<PropriedadesInvalidasExcecao, void> {
        if (!atualizado_em)
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao(
                    'A data de atualização é obrigatória.',
                ),
            )
        this._atualizado_em = atualizado_em
        return ResultadoUtil.sucesso()
    }

    get id(): number {
        return this._id
    }

    get titulo(): string {
        return this._titulo
    }
    get descricao(): string {
        return this._descricao
    }

    get usuario_id(): number {
        return this._usuario_id
    }

    get nivel_id(): number {
        return this._nivel_id
    }

    get categoria_id(): number {
        return this._categoria_id
    }

    get duracao(): number {
        return this._duracao
    }

    get criado_em(): Date {
        return this._criado_em
    }

    get atualizado_em(): Date {
        return this._atualizado_em
    }

    get aprovado(): boolean {
        return this._aprovado
    }

    get destaque(): boolean {
        return this._destaque
    }

    get recomendado(): boolean {
        return this._recomendado
    }
}
