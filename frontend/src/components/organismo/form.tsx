import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { Input } from '../atomo/input'
import { Botao } from '../atomo/Botao'
import { useState } from 'react'
import { useLogin } from '../../hooks/Login.hook'

interface LoginFormFields {
    userName: string
    passwordTxt: string
}

export const LoginForm = () => {
    const { control, handleSubmit, reset } = useForm<LoginFormFields>()
    const [showPassword, setShowPassword] = useState(false)
    const { mutate: login, isPending, error} = useLogin()

    const onSubmit: SubmitHandler<LoginFormFields> = (data) => {

        login(
            {
                usuarioOuEmail: data.userName,
                senha: data.passwordTxt
            },
            {
                onSuccess: () => {
                    reset()
                }
            }
        )
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md flex flex-col gap-4">
            <Controller
                name="userName"
                control={control}
                defaultValue=""
                rules={{
                    required: 'O nome de usuário é obrigatório!',
                    minLength: {
                        value: 3,
                        message: 'O nome precisa ter ao menos 3 letras!',
                    },
                    maxLength: {
                        value: 16,
                        message: 'O nome do usuário pode ter no máximo 16 letras!',
                    },
                }}
                render={({ field, fieldState }) => (
                    <div className="flex flex-col gap-1">
                        <label htmlFor="userName" className="font-semibold">Usuário</label>
                        <Input
                            inputType="text"
                            defaultValue=""
                            placeholderText="Nome de Usuário"
                            requiredValue={true}
                            {...field}
                        />
                        {fieldState.error && (
                            <span className="text-red-500 text-xs font-medium">{fieldState.error.message}</span>
                        )}
                    </div>
                )}
            />

            <Controller
                defaultValue=""
                name="passwordTxt"
                control={control}
                rules={{
                    required: 'A senha é obrigatória!',
                    pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).+$/,
                        message:
                            'Sua senha precisa ter um caractere especial, uma letra minúscula, maiúscula e um número!',
                    },
                    minLength: {
                        value: 8,
                        message: 'Sua senha deve possuir ao menos 8 caracteres!',
                    },
                    maxLength: {
                        value: 16,
                        message: 'Sua senha deve possuir no máximo 16 caracteres!',
                    },
                }}
                render={({ field, fieldState }) => (
                    <div className="flex flex-col gap-1 relative">
                        <label htmlFor="passwordTxt" className="font-semibold">Senha</label>
                        <Input
                            inputType={showPassword ? 'text' : 'password'}
                            defaultValue=""
                            placeholderText="Senha"
                            requiredValue={true}
                            {...field}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((v) => !v)}
                            className="absolute right-3 top-8 text-gray-400"
                            tabIndex={-1}
                        >
                            {showPassword ? 'Ocultar' : 'Mostrar'}
                        </button>
                        {fieldState.error && (
                            <span className="text-red-500 text-xs font-medium">{fieldState.error.message}</span>
                        )}
                    </div>
                )}
            />

            <Botao
                texto={isPending ? 'Entrando...' : 'Login'}
                type="submit"
                tamanho="grande"
                desabilitado={isPending}
            />
            {error && (
                <span className="text-red-500 font-semibold text-center">
                    {error.message}
                </span>
            )}
        </form>
    )
}
