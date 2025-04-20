import { AlterarSenhaUseCase } from './ALterarSenha.usecase'
import { AtualizarUsuarioUseCase } from './AtualizarUsuario.usecase'
import { DeletarUsuarioUseCase } from './DeletarUsuario.usecase'
import { LoginUseCase } from './Login.usecase'
import { RecuperarSenhaUseCase } from './RecuperarSenha.usecase'
import { SalvarUsuarioUseCase } from './SalvarUsuario.usecase'
import { VerificarTokenRecuperarSenhaUseCase } from './VerificarTokenRecuperarSenha.usecase'

export const UseCases = [
    SalvarUsuarioUseCase,
    LoginUseCase,
    AtualizarUsuarioUseCase,
    DeletarUsuarioUseCase,
    RecuperarSenhaUseCase,
    VerificarTokenRecuperarSenhaUseCase,
    AlterarSenhaUseCase,
]
