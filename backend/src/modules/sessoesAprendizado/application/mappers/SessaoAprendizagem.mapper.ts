import {
    AgendarSessaoDto,
    SessaoAprendizagemDto,
} from '../dtos/sessaoAprendizagem.dto'
import { SessaoAprendizagem } from '../../domain/models/SessaoAprendizagem.model'
import { Resultado } from 'src/utils/result'
import { PropriedadesInvalidasExcecao } from 'src/utils/exception'

export class SessaoAprendizagemMapperApplication {
    toDto(domain: SessaoAprendizagem): SessaoAprendizagemDto {
        return {
            id: domain.id,
            titulo: domain.titulo,
            descricao: domain.descricao,
            participantes_id: domain.participantes_id,
            dataHoraInicio: domain.dataHoraInicio,
            dataHoraFim: domain.dataHoraFim,
            linkVideo: domain.linkVideo,
            status: domain.status,
            criadoEm: domain.criadoEm,
            atualizadoEm: domain.atualizadoEm,
        }
    }

    toDomain(
        dto: AgendarSessaoDto,
    ): Resultado<PropriedadesInvalidasExcecao, SessaoAprendizagem> {
        return SessaoAprendizagem.criar({
            titulo: dto.titulo,
            descricao: dto.descricao,
            participantes_id: dto.participantes_id,
            dataHoraInicio: dto.dataHoraInicio,
            dataHoraFim: dto.dataHoraFim,
            linkVideo: dto.linkVideo,
            status: dto.status,
        })
    }
}
