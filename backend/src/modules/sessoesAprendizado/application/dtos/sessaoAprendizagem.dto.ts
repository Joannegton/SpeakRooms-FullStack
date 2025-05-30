import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class AgendarSessaoDto {
    @ApiProperty({
        description: 'Id do criador da sessão no Zoom',
        example: 1,
    })
    @IsNumber({}, { message: 'Id do criador deve ser um número.' })
    @IsNotEmpty({ message: 'Id do criador é obrigatório.' })
    criadorId: number

    @ApiProperty({
        description: 'Título da sessão',
        example: 'Verbo To Be',
    })
    @IsString({ message: 'Título deve ser uma string.' })
    @IsNotEmpty({ message: 'Título é obrigatório.' })
    titulo: string

    @ApiProperty({
        description: 'Descrição da sessão',
        example: 'Aula sobre o verbo to be',
    })
    @IsString({ message: 'Descrição deve ser uma string.' })
    descricao?: string

    @ApiProperty({
        description: 'IDs dos participantes',
        example: [1, 2, 3],
    })
    @IsNotEmpty({ message: 'Participantes são obrigatórios.' })
    @IsArray({ message: 'Participantes devem ser um array de números.' })
    participantes_id: number[]

    @ApiProperty({
        description: 'Data e hora de início da sessão',
        example: '2023-10-01T10:00:00Z',
    })
    @IsNotEmpty({ message: 'Data e hora de início são obrigatórios.' })
    dataHoraInicio: Date

    @ApiProperty({
        description: 'Data e hora de fim da sessão',
        example: '2023-10-01T11:00:00Z',
    })
    @IsNotEmpty({ message: 'Data e hora de fim são obrigatórios.' })
    dataHoraFim: Date

    @ApiProperty({
        description: 'Link do vídeo da sessão',
        example: 'https://example.com/video',
    })
    @IsString({ message: 'Link do vídeo deve ser uma string.' })
    @IsNotEmpty({ message: 'Link do vídeo é obrigatório.' })
    linkVideo: string

    @ApiProperty({
        description: 'Status da sessão',
        example: 'agendada',
    })
    @IsString({ message: 'Status deve ser uma string.' })
    @IsNotEmpty({ message: 'Status é obrigatório.' })
    status: 'agendada' | 'concluida' | 'cancelada'
}

export class SessaoAprendizagemDto extends AgendarSessaoDto {
    @ApiProperty({
        description: 'ID da sessão',
        example: 1,
    })
    id: number

    @ApiProperty({
        description: 'Data e hora de criação da sessão',
        example: '2023-10-01T09:00:00Z',
    })
    criadoEm: Date

    @ApiProperty({
        description: 'Data e hora de atualização da sessão',
        example: '2023-10-01T09:00:00Z',
    })
    atualizadoEm: Date
}
