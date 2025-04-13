import { useForm, Controller } from 'react-hook-form'
import { Input } from '../atomo/input'
import { Botao } from '../atomo/Botao'

export const LoginForm = () => {
    const { control, handleSubmit } = useForm()
    const onSubmit = (data: any) => console.log(data)

    return (
        <form onSubmit={handleSubmit(onSubmit)} className=" w-96">
            <Controller
                name="userName"
                control={control}
                defaultValue=""
                rules={{
                    required: true,
                    minLength: {
                        value: 3,
                        message: 'O nome precisa ter ao menos 3 letras!',
                    },
                    maxLength: {
                        value: 16,
                        message:
                            'O nome do usuário pode etr no máximo 16 letras!',
                    },
                }}
                render={({ field, fieldState }) => (
                    <>
                        <Input
                            inputType="text"
                            defaultValue=""
                            placeholderText="Nome de Usuário"
                            requiredValue={true}
                            {...field}
                        />
                        {fieldState.error && (
                            <span>{fieldState.error.message}</span>
                        )}
                    </>
                )}
            />

            <Controller
                defaultValue=""
                name="passwordTxt"
                control={control}
                rules={{
                    required: true,
                    pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).+$/,
                        message:
                            'Sua senha precisa ter um caractere especial, uma letra minuscula e maiuscula e um número!',
                    },

                    minLength: {
                        value: 8,
                        message:
                            'Sua senha deve possuir ao menos 8 caracteres!',
                    },

                    maxLength: {
                        value: 16,
                        message:
                            'Sua senha deve possuir no máximo 16 caracteres!',
                    },
                }}
                render={({ field, fieldState }) => (
                    <>
                        <Input
                            inputType="password"
                            defaultValue=""
                            placeholderText="Senha"
                            requiredValue={true}
                            {...field}
                        />
                        {fieldState.error && (
                            <span>{fieldState.error.message}</span>
                        )}
                    </>
                )}
            />

            <Botao
            texto='Login'
            type='submit'
            tamanho='grande'
            onClick={() => ({})}
            />
        </form>
    )
}
