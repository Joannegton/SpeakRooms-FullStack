import { useState, useRef, useEffect, ChangeEvent, FocusEvent } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'

interface InputOutlinedProps {
    value: string | undefined
    label?: string
    placeholder: string
    className?: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    onBlur?: (e: FocusEvent<HTMLInputElement>) => void // adicionada prop onBlur
    type?: 'text' | 'password'
    autoComplete?: string // nova prop
    error?: string // nova prop para erro
}

export const InputOutlined = ({
    label,
    value,
    onChange,
    onBlur, // nova prop
    placeholder,
    className,
    type = 'text',
    autoComplete = 'off', // valor padrão
    error, // nova prop
}: InputOutlinedProps) => {
    const [foco, setFoco] = useState(false)
    const labelRef = useRef<HTMLLabelElement>(null)
    const [minWidth, setMinWidth] = useState<number | undefined>(undefined)
    const [showPassword, setShowPassword] = useState(false)

    useEffect(() => {
        if (labelRef.current) {
            setMinWidth(labelRef.current.offsetWidth + 16)
        }
    }, [label])

    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.offsetWidth
                setMinWidth(containerWidth - 16)
            }
        }

        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <div ref={containerRef} className={`relative h-fit w-full ${className}`}>
            {label && (
                <label
                    ref={labelRef}
                    className={`
                        absolute left-2 transition-all pointer-events-none truncate z-10
                        ${foco || value ? 'px-1 text-xs -top-2 text-gray-600 bg-white' : 'top-2.5 text-gray-400'}
                    `}
                >
                    {label}
                </label>
            )}
            <div className="flex items-center relative">
                <input 
                    type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
                    value={value}
                    onChange={onChange}
                    onBlur={e => {
                        setFoco(false)
                        if (onBlur) onBlur(e)
                    }}
                    placeholder={foco || value ? placeholder : ''}
                    style={{ minWidth }}
                    className={`outline-none w-full px-2 py-2 focus:outline focus:border-primary border-2 border-solid rounded-md ${error ? 'border-red-500' : 'border-gray-300'} ${className}`}
                    onFocus={() => setFoco(true)}
                    autoComplete={autoComplete}
                />
                {type === 'password' && (
                    <button
                        type="button"
                        tabIndex={-1}
                        className="absolute right-2 top-2.5 text-gray-400 cursor-pointer"
                        onClick={() => setShowPassword((v) => !v)}
                    >
                        {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                    </button>
                )}
            </div>
            {error && (
                <span className="text-xs text-red-500 mt-1 block">{error}</span>
            )}
        </div>
    )
}
