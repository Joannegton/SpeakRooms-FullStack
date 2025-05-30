import {
    AgendarSessaoDto,
    SessaoAprendizagemDto,
} from '../dtos/sessaoAprendizagem.dto'
import { SessaoAprendizagem } from '../../domain/models/SessaoAprendizagem.model'
import { Resultado } from 'http-service-result'
import { PropriedadesInvalidasExcecao } from 'http-service-result'

export class SessaoAprendizagemMapperApplication {
    static toDto(domain: SessaoAprendizagem): SessaoAprendizagemDto {
        return {
            id: domain.id,
            criadorId: domain.criadorId,
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

    static toDomain(
        dto: AgendarSessaoDto,
    ): Resultado<PropriedadesInvalidasExcecao, SessaoAprendizagem> {
        return SessaoAprendizagem.criar({
            criadorId: dto.criadorId,
            titulo: dto.titulo,
            descricao: dto.descricao,
            participantes_id: dto.participantes_id,
            dataHoraInicio: dto.dataHoraInicio,
            dataHoraFim: dto.dataHoraFim,
            linkVideo: dto.linkVideo,
            status: dto.status,
        })
    }

    static toDtoList(
        domainList: SessaoAprendizagem[],
    ): SessaoAprendizagemDto[] {
        return domainList.map((domain) => this.toDto(domain))
    }
}
