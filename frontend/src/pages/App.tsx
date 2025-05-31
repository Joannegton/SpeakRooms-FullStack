import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Botao } from '../components/atomo/Botao'
import { LoginForm } from '../components/organismo/form'
import Modal from '../components/molecula/Modal'

function UsuarioModalContent() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['usuarioExemplo'],
        queryFn: async () => {
            const res = await fetch('https://jsonplaceholder.typicode.com/users/1')
            if (!res.ok) { throw new Error('Erro ao buscar usuário') }
            return res.json()
        }
    })
    if (isLoading) { return <p>Carregando...</p> }
    if (error) { return <p>Erro ao carregar usuário.</p> }
    return (
        <div>
            <p><b>Nome:</b> {data.name}</p>
            <p><b>Email:</b> {data.email}</p>
        </div>
    )
}

export const App = () => {
    return (
        <div className='font-poppins'>
            <LoginForm/>
        </div>
    )}
