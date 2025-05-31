import React from 'react'

interface BotaoProps {
    texto?: string;
    onClick?: () => void;
    tamanho?: 'pequeno' | 'medio' | 'grande';
    variante?: 'primario' | 'secundario' | 'terciario';
    icone?: React.ReactNode;
    desabilitado?: boolean;
    className?: string;
    iconePosicao?: 'esquerda' | 'direita';
    type?: string
}

export function Botao({
    texto,
    onClick,
    tamanho = 'medio',
    icone,
    type,
    desabilitado = false,
    className = '',
    iconePosicao = 'esquerda',
}: BotaoProps) {
    const tamanhos = {
        pequeno: 'px-2 py-1 text-sm',
        medio: 'px-4 py-2 text-base',
        grande: 'px-6 py-3 text-lg',
    }

    return (
        <button
            onClick={onClick}
            disabled={desabilitado}
            typeof={type}
            className={`flex items-center justify-center gap-2 rounded ${tamanhos[tamanho]}  
                ${desabilitado ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'} ${className}
                bg-primary hover:bg-primary-hover
            `}
        >
            {icone && iconePosicao === 'esquerda' && <span>{icone}</span>}
            {texto && <span className='text-white font-semibold'>{texto}</span>}
            {icone && iconePosicao === 'direita' && <span>{icone}</span>}
        </button>
    )
}
