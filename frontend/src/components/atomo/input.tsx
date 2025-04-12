import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useState, ChangeEvent } from 'react'

interface InputProps {
    defaultValue: string
    name: string
    requiredValue: boolean
    inputType: 'text' | 'password' | 'email' | 'number'
    placeholderText?: string
    onChange?: (value: string) => void
    className?: string
    rules?: any
}

export const Input = ({
    defaultValue,
    inputType,
    placeholderText,
    onChange,
    className,
}: InputProps) => {
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
        <div className={`relative w-full ${className}`}>
            <input
                className="w-full rounded-md border border-border-color bg-transparent px-2 py-1 text-sm text-text-black focus:outline-primary"
                type={inputType === 'password' && mostrarSenha ? 'text' : inputType}
                defaultValue={defaultValue}
                placeholder={placeholderText}
                onChange={(e) => {
                    handleChange(e)
                }}
            />
            {inputType === 'password' && (
                <button
                    type="button"
                    onClick={alternarVisibilidade}
                    aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
                    className="absolute right-2 top-1/2 -translate-y-1/2 transform text-gray-400"
                >
                    {mostrarSenha ? <VisibilityOff aria-hidden="true" /> : <Visibility aria-hidden="true" />}
                </button>
            )}
        </div>
    )
}
