import { ApiExcecao, ResultadoAssincrono, ResultadoUtil, post } from 'http-service-result'

export interface CadastroUsuarioProps {
    nome: string
    email: string
    senha: string
    confirmarSenha: string
    nivel: string
}

export interface Usuario {
    id: string
    nome: string
    email: string
    token: string
}

export const CadastrarUsuario = async (props: CadastroUsuarioProps): ResultadoAssincrono<ApiExcecao, any> => {
    const response = await post<any>('/usuario', {
        body: {
            nomeUsuario: props.nomeUsuario,
            email: props.email,
            senha: props.senha,
            nivelInglesId: props.proficiencia
        }
    })

    if (response.ehFalha()) return ResultadoUtil.falha(new ApiExcecao(response.erro.message))
    console.log('response', response.valor.data)
    return ResultadoUtil.sucesso(response.valor.data)
}