import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Login, LoginProps, Usuario } from '../api/Login.api'
import { useUsuarioStore } from '../store/useUsuarioStore'

export const useLogin = () => {
    const queryClient = useQueryClient()

    return useMutation<Usuario, Error, LoginProps>({
        mutationFn: async (props: LoginProps) => {
            const resultado = await Login(props)
            if (resultado.ehFalha()) {
                throw new Error(resultado.erro.message)
            }
            return resultado.valor
        },
        onSuccess(data) {
            queryClient.setQueryData<Usuario>(['usuario'], data) // Atualiza o cache com o usuário logado
            useUsuarioStore.getState().setUsuario(data) // Atualiza a store Zustand
        },
        onError(error) {
            throw error // Repassa o erro para ser tratado no componente
        },
    })
}