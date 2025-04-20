import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class VerificarTokenRecuperarSenhaDto {
    @ApiProperty({
        description: 'Token de recuperação de senha',
        example: '123456',
    })
    @IsString()
    @IsNotEmpty()
    token: string

    @ApiProperty({
        description: 'ID do usuário',
        example: 1,
    })
    @IsNumber()
    @IsNotEmpty()
    usuarioId: number
}
