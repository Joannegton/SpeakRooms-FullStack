import { IsNotEmpty } from '@nestjs/class-validator'

export class LoginParamsDto {
    @IsNotEmpty()
    emailOuUsuario: string

    @IsNotEmpty()
    senha: string
}

export class LoginResultDto {
    accessToken: string
    usuario_id: number
    nome_usuario: string
}
