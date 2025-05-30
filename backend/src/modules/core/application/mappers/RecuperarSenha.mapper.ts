import { PropriedadesInvalidasExcecao } from 'http-service-result'
import { RecuperarSenha } from '../../domain/models/RecuperarSenha.model'
import { Resultado, ResultadoUtil } from 'http-service-result'

export class RecuperarSenhaMapperApplication {
    toDomain(
        usuarioId: number,
    ): Resultado<PropriedadesInvalidasExcecao, RecuperarSenha> {
        const domainResult = RecuperarSenha.criar(usuarioId)

        if (domainResult.ehFalha()) {
            return ResultadoUtil.falha(domainResult.erro)
        }

        return ResultadoUtil.sucesso(domainResult.valor)
    }
}
