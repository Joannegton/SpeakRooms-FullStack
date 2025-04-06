import { AtualizarUsuarioUseCase } from './AtualizarUsuario.usecase'
import { DeletarUsuarioUseCase } from './DeletarUsuario.usecase'
import { LoginUseCase } from './Login.usecase'
import { SalvarUsuarioUseCase } from './SalvarUsuario.usecase'

export const UseCases = [
    SalvarUsuarioUseCase,
    LoginUseCase,
    AtualizarUsuarioUseCase,
    DeletarUsuarioUseCase,
]
