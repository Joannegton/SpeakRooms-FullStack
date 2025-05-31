import { useForm, Controller } from 'react-hook-form'
import { Form } from '../../atomo/Form'
import { InputOutlined } from '../../atomo/InputOutlined'
import { SelectOutlined } from '../../atomo/SelectOutlined'
import { Botao } from '../../atomo/Botao'
import { CadastrarUsuario } from '../../../api/CadastroUsuario.api'

type FormData = {
    nome: string
    email: string
    senha: string
    confirmarSenha: string
    nivel: string
}

export const CadastroUsuarioForm = () => {
    const { control, handleSubmit, formState: { errors }, watch } = useForm<FormData>({
        mode: 'onBlur'
    })
    const senha = watch('senha')

    const onSubmit = async (data: FormData) => {
        const cadastro = await CadastrarUsuario(data)
        if (cadastro.ehFalha()) return alert(cadastro.erro?.message || 'Erro ao cadastrar usuário')

        console.log('Usuário cadastrado com sucesso:', cadastro.valor)
    }

    return (
        <Form 
            title={'Criar uma conta'}
            subtitle='Junte-se à nossa comunidade de estudantes de inglês'
            action=""
            onSubmit={handleSubmit(onSubmit)}
        >
            <Controller
                name="nome"
                control={control}
                rules={{ required: 'Nome é obrigatório' }}
                render={({ field }) => (
                    <InputOutlined
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        placeholder='Joannegton'
                        label='Nome de usuário'
                        className='mb-2'
                        error={errors.nome?.message}
                    />
                )}
            />
            <Controller
                name="email"
                control={control}
                rules={{
                    required: 'E-mail é obrigatório',
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'E-mail inválido' }
                }}
                render={({ field }) => (
                    <InputOutlined
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        placeholder='joannegton@example.com'
                        label='E-mail'
                        className='mb-2'
                        error={errors.email?.message}
                    />
                )}
            />
            <Controller
                name="senha"
                control={control}
                rules={{
                    required: 'Senha é obrigatória',
                    minLength: { value: 6, message: 'Mínimo 6 caracteres' }
                }}
                render={({ field }) => (
                    <InputOutlined
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        placeholder='********'
                        label='Senha'
                        type='password'
                        className='mb-2'
                        error={errors.senha?.message}
                        autoComplete="new-password"
                    />
                )}
            />
            <Controller
                name="confirmarSenha"
                control={control}
                rules={{
                    required: 'Confirme a senha',
                    validate: value => value === senha || 'As senhas não coincidem'
                }}
                render={({ field }) => (
                    <InputOutlined
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        placeholder='********'
                        label='Confirmar senha'
                        type='password'
                        className='mb-2'
                        error={errors.confirmarSenha?.message}
                        autoComplete="new-password"
                    />
                )}
            />
            <Controller
                name="nivel"
                control={control}
                rules={{ required: 'Selecione um nível' }}
                render={({ field }) => (
                    <SelectOutlined
                        value={field.value}
                        onChange={field.onChange}
                        label='Nível de proficiência'
                        options={{
                            1: 'Português',
                            2: 'Inglês',
                            3: 'Espanhol',
                            4: 'Francês',
                            5: 'Alemão',
                            6: 'Italiano',
                        }}
                        error={errors.nivel?.message}
                    />
                )}
            />

            <Botao texto='Cadastrar' className='m-auto w-full mt-6'/>
        </Form>
    )
}