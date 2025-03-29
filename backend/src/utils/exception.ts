/* eslint-disable @typescript-eslint/no-explicit-any */
export abstract class Excecao extends Error {
    detalhe: string

    constructor(propriedadesCriacao?: Error | string) {
        super()
        if (propriedadesCriacao instanceof Error) {
            this.message = propriedadesCriacao.message
            this.stack = propriedadesCriacao.stack
        } else {
            this.detalhe = propriedadesCriacao
            this.message = propriedadesCriacao
        }

        this.name = this.obterNome()
    }

    abstract obterNome(): string

    abstract obterInstancia(): this

    definirMensagem(mensagem: string): this {
        this.message = mensagem
        return this.obterInstancia()
    }

    definirStack(stack: string): this {
        this.stack = stack
        return this.obterInstancia()
    }

    definirDetalhe(detalhe: string): this {
        this.detalhe = detalhe
        return this.obterInstancia()
    }

    toString(): string {
        return `${this.name}: ${this.message}. ${this.detalhe} - ${this.stack}`
    }
}

export class RepositorioExcecao extends Excecao {
    excecaoRepositorio = 'chave'

    obterMensagem(): string {
        return `Erro ao realizar ação no repositório`
    }

    obterNome(): string {
        return RepositorioExcecao.name
    }

    obterInstancia(): this {
        return this
    }
}

export class ServicoExcecao extends Excecao {
    excecaoServico = 'chave'

    obterMensagem(): string {
        return `Erro ao realizar ação no serviço`
    }

    obterNome(): string {
        return ServicoExcecao.name
    }

    obterInstancia(): this {
        return this
    }
}

export class QQFrameworkExcecao extends Excecao {
    excecaoQQFramework = 'chave'

    obterMensagem(): string {
        return `Erro lançado pelo QQFramework`
    }

    obterNome(): string {
        return QQFrameworkExcecao.name
    }

    obterInstancia(): this {
        return this
    }
}

export class PropriedadesInvalidasExcecao extends Excecao {
    excecaoPropriedadesInvalidas = 'chave'

    obterInstancia(): this {
        return this
    }

    obterMensagem(): string {
        return `Propriedades inválidas!`
    }

    obterNome(): string {
        return PropriedadesInvalidasExcecao.name
    }
}

export class HttpExcecao extends Excecao {
    excecaoHttp = 'chave'
    status: number
    dados: any

    obterInstancia(): this {
        return this
    }

    obterMensagem(): string {
        return `Erro ao tentar realizar uma requisição HTTP`
    }

    obterNome(): string {
        return HttpExcecao.name
    }

    definirDados(dados: any): HttpExcecao {
        this.dados = dados
        return this
    }

    definirStatus(status: number): HttpExcecao {
        this.status = status
        return this
    }
}

export class ProcessoExecutandoExcecao extends Excecao {
    excecaoProcessoExecutando = 'chave'

    obterInstancia(): this {
        return this
    }

    obterMensagem(): string {
        return `Processo já está em execução`
    }

    obterNome(): string {
        return ProcessoExecutandoExcecao.name
    }
}

export class RepositorioSemDadosExcecao extends Excecao {
    excecaoRepositorioSemDados = 'chave'

    obterInstancia() {
        return this
    }

    obterMensagem(): string {
        return this.message
    }

    obterNome(): string {
        return RepositorioSemDadosExcecao.name
    }
}
