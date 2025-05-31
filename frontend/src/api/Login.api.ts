import { ApiExcecao, ResultadoAssincrono, ResultadoUtil, post } from 'http-service-result'

export interface LoginProps {
    usuarioOuEmail: string
    senha: string
}

export interface Usuario {
    id: string
    nome: string
    email: string
    token: string
}

export const Login = async (props: LoginProps): ResultadoAssincrono<ApiExcecao, Usuario> => {
    const response = await post<Usuario>('/auth', {
        body: {
            usuarioOuEmail: props.usuarioOuEmail,
            senha: props.senha
        }
    })

    if (response.ehFalha()) return ResultadoUtil.falha(new ApiExcecao(response.erro.message))
    
    return ResultadoUtil.sucesso(response.valor.data)
}