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
}

export function Botao({
    texto,
    onClick,
    tamanho = 'medio',
    variante = 'primario',
    icone,
    desabilitado = false,
    className = '',
    iconePosicao = 'esquerda',
}: BotaoProps) {
    const tamanhos = {
        pequeno: 'px-2 py-1 text-sm',
        medio: 'px-4 py-2 text-base',
        grande: 'px-6 py-3 text-lg',
    }
 
    // configurar estilos personalizados para o projeto
    const variantes = {
        primario: 'bg-blue-500 text-white hover:bg-blue-600',
        secundario: 'bg-gray-500 text-white hover:bg-gray-600',
        terciario: 'bg-transparent text-blue-500 border border-blue-500 hover:bg-blue-100',
    }

    return (
        <button
            onClick={onClick}
            disabled={desabilitado}
            className={`flex items-center justify-center gap-2 rounded ${tamanhos[tamanho]} ${variantes[variante]} ${
                desabilitado ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'
            } ${className}`}
        >
            {icone && iconePosicao === 'esquerda' && <span>{icone}</span>}
            {texto && <span>{texto}</span>}
            {icone && iconePosicao === 'direita' && <span>{icone}</span>}
        </button>
    )
}
