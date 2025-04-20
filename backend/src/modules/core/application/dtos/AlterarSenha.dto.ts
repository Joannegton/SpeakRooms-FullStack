import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class AlterarSenhaDto {
    @ApiProperty({ description: 'ID do usuário', example: 1 })
    @IsNumber()
    @IsNotEmpty()
    usuarioId: number

    @ApiProperty({
        description: 'Senha do usuário',
        example: 'senha123',
    })
    @IsNotEmpty()
    @IsString()
    senha: string
}
