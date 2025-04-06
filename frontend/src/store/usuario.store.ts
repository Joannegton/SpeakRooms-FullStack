import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Usuario = {
    id: number
    nome_usuario: string
    email: string
}

type UsuarioStore = {
    usuario: Usuario | null
    isLoggedIn: boolean
    setUsuario: (usuario: Usuario) => void
    logout: () => void
}

export const useUsuarioStore = create<UsuarioStore>()(
    persist<UsuarioStore>(
        (set) => ({
            usuario: null,
            isLoggedIn: false,
            setUsuario: (usuario: Usuario) => set(() => ({
                usuario,
                isLoggedIn: true
            })),
            logout: () => {
                set(() => ({
                    usuario: null,
                    isLoggedIn: false
                }))
                localStorage.removeItem('usuario-store')
            }
        }),
        {
            name: 'usuario-store'
        }
    )
)