import { create } from 'zustand'
import { Usuario } from '../api/Login.api'

interface UsuarioStore {
    usuario: Usuario | null
    setUsuario: (usuario: Usuario | null) => void
}

export const useUsuarioStore = create<UsuarioStore>((set) => ({
    usuario: null,
    setUsuario: (usuario) => set({ usuario }),
}))
