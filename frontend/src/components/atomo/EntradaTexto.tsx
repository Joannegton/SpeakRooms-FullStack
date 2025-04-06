import { Visibility, VisibilityOff } from '@mui/icons-material'
import { ChangeEvent, useState } from 'react'

type Props = {
    label?: string
    placeholder?: string
    type: 'text' | 'password' | 'email' | 'number'
    className?: string
    esqueceuSenha?: () => void
    onChange?: (value: string) => void
}

export const EntradaTexto = ({
    label,
    placeholder,
    type,
    className,
    esqueceuSenha,
    onChange
}: Props) => {
    const [mostrarSenha, setMostrarSenha] = useState(false)

    const alternarVisibilidade = () => {
        setMostrarSenha(!mostrarSenha)
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (onChange) {
            onChange(value)
        }
    }

    return (
        <div className={`w-full ${className}`}>
            <div className='flex justify-between items-center mb-1'>
                {label && <label className="text-sm text-text-black">{label}</label>}
                {type === 'password' && (
                    <label
                        className="text-sm font-semibold text-text-black cursor-pointer"
                        onClick={esqueceuSenha}
                    >
                        Esqueceu a senha?
                    </label>
                )}
            </div>
            <div className="relative">
                <input
                    type={type === 'password' && mostrarSenha ? 'text' : type}
                    placeholder={placeholder}
                    className="w-full rounded-md border border-border-color bg-transparent px-2 py-1 text-sm text-text-black focus:outline-primary"
                    onChange={handleChange}
                />
                {type === 'password' && (
                    <button
                        type="button"
                        onClick={alternarVisibilidade}
                        aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
                    >
                        {mostrarSenha ? (
                            <VisibilityOff aria-hidden="true" />
                        ) : (
                            <Visibility aria-hidden="true" />
                        )}
                    </button>
                )}
            </div>
        </div>
    )
}
