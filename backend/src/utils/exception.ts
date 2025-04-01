/* eslint-disable @typescript-eslint/no-explicit-any */
export abstract class Excecao extends Error {
    constructor(props?: Error | string) {
        super()
        if (props instanceof Error) {
            this.message = props.message
            this.stack = props.stack
        } else {
            this.message = props
        }

        this.name = this.getNome()
    }

    abstract getNome(): string

    abstract getInstancia(): this

    setMensagem(mensagem: string): this {
        this.message = mensagem
        return this.getInstancia()
    }

    setStack(stack: string): this {
        this.stack = stack
        return this.getInstancia()
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setDetalhes(detalhe: string): this {
        //this.detalhe = detalhe
        return this.getInstancia()
    }

    toString(): string {
        return `${this.name}: ${this.message}. - ${this.stack}`
    }
}

export class RepositorioExcecao extends Excecao {
    excecaoRepositorio = 'ordem'

    getMensagem(): string {
        return `Erro ao realizar ação no repositório`
    }

    getNome(): string {
        return RepositorioExcecao.name
    }

    getInstancia(): this {
        return this
    }
}

export class ServicoExcecao extends Excecao {
    excecaoServico = 'ordem'

    getMensagem(): string {
        return `Erro ao realizar ação no serviço`
    }

    getNome(): string {
        return ServicoExcecao.name
    }

    getInstancia(): this {
        return this
    }
}

export class PropriedadesInvalidasExcecao extends Excecao {
    getInstancia(): this {
        return this
    }

    getMensagem(): string {
        return `Propriedades inválidas!`
    }

    getNome(): string {
        return PropriedadesInvalidasExcecao.name
    }
}

export class HttpExcecao extends Excecao {
    excecaoHttp = 'ordem'
    status: number
    dados: any

    getInstancia(): this {
        return this
    }

    getMensagem(): string {
        return `Erro ao tentar realizar uma requisição HTTP`
    }

    getNome(): string {
        return HttpExcecao.name
    }

    setDados(dados: any): HttpExcecao {
        this.dados = dados
        return this
    }

    definirStatus(status: number): HttpExcecao {
        this.status = status
        return this
    }
}

export class RepositorioSemDadosExcecao extends Excecao {
    excecaoRepositorioSemDados = 'ordem'

    getInstancia() {
        return this
    }

    getMensagem(): string {
        return this.message
    }

    getNome(): string {
        return RepositorioSemDadosExcecao.name
    }
}

export class UsuarioBloqueadoException extends Excecao {
    getInstancia() {
        return this
    }

    getMensagem(): string {
        return this.message
    }

    getNome(): string {
        return UsuarioBloqueadoException.name
    }
}
