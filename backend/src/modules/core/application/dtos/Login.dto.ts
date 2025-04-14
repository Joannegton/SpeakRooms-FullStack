import { IsNotEmpty } from '@nestjs/class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class LoginParamsDto {
    @ApiProperty({
        description: 'Email ou nome de usuário do usuário',
        example: 'magalhaes@gmail.com',
        required: true,
    })
    @IsNotEmpty()
    emailOuUsuario: string

    @ApiProperty({
        description: 'Senha do usuário',
        example: 'senha123',
        required: true,
    })
    @IsNotEmpty()
    senha: string
}

export class LoginResultDto {
    @ApiProperty({
        description: 'Token de acesso do usuário',
        example: 'token_de_acesso_exemplo',
    })
    accessToken: string

    @ApiProperty({
        description: 'ID do usuário',
        example: 1,
    })
    usuario_id: number

    @ApiProperty({
        description: 'Nome do usuário',
        example: 'João Silva',
    })
    nome_usuario: string
}
