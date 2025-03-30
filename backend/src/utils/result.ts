/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Excecao } from './exception'

export type Resultado<E, V> = Falha<E, V> | Sucesso<E, V>
export type ResultadoAssincrono<E, V> = Promise<Resultado<E, V>>

interface IResultado<E, V> {
    /**
     * Usado para verificar se um `Resultado` é um `Sucesso`
     *
     * @returns `true` se o resultado for uma variante `Sucesso` de Resultado
     */
    ehSucesso(): this is Sucesso<E, V>

    /**
     * Usado para verificar se um `Resultado` é uma `Falha`
     *
     * @returns `true` se o resultado for uma variante `Falha` de Resultado
     */
    ehFalha(): this is Falha<E, V>
}

export class Falha<E, V> implements IResultado<E, V> {
    readonly erro: E

    constructor(erro: E) {
        this.erro = erro
    }

    ehFalha(): this is Falha<E, V> {
        return true
    }

    ehSucesso(): this is Sucesso<E, V> {
        return false
    }

    aplicarNoValor<B>(_: (valor: V) => B): Resultado<E, B> {
        return this as any
    }
}

export class Sucesso<E, V> implements IResultado<E, V> {
    readonly valor: V

    constructor(valor?: V) {
        this.valor = valor
    }

    ehFalha(): this is Falha<E, V> {
        return false
    }

    ehSucesso(): this is Sucesso<E, V> {
        return true
    }

    aplicarNoValor<B>(func: (valor: V) => B): Resultado<E, B> {
        return new Sucesso(func(this.valor))
    }
}

export abstract class ResultadoUtil {
    public static sucesso<V = void, E = any>(valor?: V): Resultado<E, V> {
        return new Sucesso(valor)
    }

    public static falha<E extends Excecao, V>(valor: E): Resultado<E, V> {
        return new Falha(valor)
    }

    public static ehSucesso<E, V>(
        listaResultados: Array<IResultado<E, V>>,
    ): boolean {
        return listaResultados.find((resultado) => resultado.ehFalha())
            ? false
            : true
    }

    public static possuiFalha<E, V = any>(
        resultado: IResultado<E, V> | IResultado<E, V>[],
    ): boolean {
        if (Array.isArray(resultado)) {
            return resultado.find((r) => r.ehFalha()) ? true : false
        } else {
            return resultado.ehSucesso() ? false : true
        }
    }

    public static listarFalhas<E, V = any>(
        resultados: IResultado<E, V>[],
    ): Falha<E[], V> {
        const erros: E[] = []
        for (const r of resultados) {
            if (r.ehFalha()) {
                erros.push(r.erro)
            }
        }

        return new Falha<E[], V>(erros)
    }

    public static getFalha<E, V = any>(
        resultados: IResultado<E, V>[],
    ): Falha<E, V> {
        return resultados.find((r) => r.ehFalha()) as Falha<E, V>
    }

    public static getValor<E, V = any>(resultado: IResultado<E, V>): V {
        if (resultado.ehSucesso()) return resultado.valor
        else throw new Error(`Resultado não possui valor`)
    }

    public static obterResultado<E, V>(
        listaResultados: IResultado<E, unknown>[],
        valorSucesso: V,
    ): Resultado<E, V> {
        return this.possuiFalha(listaResultados)
            ? this.getFalha<E>(listaResultados)
            : new Sucesso(valorSucesso)
    }
}
