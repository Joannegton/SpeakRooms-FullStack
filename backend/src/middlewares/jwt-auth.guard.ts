import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
import { HashService } from 'src/modules/core/domain/services/Hash.service'
import { NaoAutorizadoExcecao } from 'http-service-result'

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector,
        @Inject('HashService')
        private hashService: HashService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
            context.getHandler(),
            context.getClass(),
        ])
        const isPublicAuth = this.reflector.getAllAndOverride<boolean>(
            'isPublicAuth',
            [context.getHandler(), context.getClass()],
        )
        if (isPublic) {
            return true
        }

        const request = context.switchToHttp().getRequest()
        const token = this.extractTokenFromCookie(request)
        if (!token && !isPublicAuth) {
            throw new NaoAutorizadoExcecao('Token não informado')
        }
        try {
            const jwtVerify = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET,
            })

            // Verificar se o token é de acesso ou de reset de senha
            if (request.cookies['acessToken']) {
                const payload = JSON.parse(
                    this.hashService.decryptString(jwtVerify.encrypt),
                )
                request.user = payload
            } else if (request.cookies['resetSenhaToken']) {
                request.user = { usuarioId: jwtVerify.usuarioId } // Payload simples do resetSenhaToken
            }

            return true
        } catch (error) {
            if (isPublicAuth) return true
            console.error('Token inválido ou expirado', error)
            throw new NaoAutorizadoExcecao('Token expirado ou inválido')
        }
    }

    private extractTokenFromCookie(request: Request): string | null {
        const acessToken = request.cookies['acessToken']
        const resetSenhaToken = request.cookies['resetSenhaToken']
        if (acessToken) {
            return acessToken
        }
        if (resetSenhaToken) {
            return resetSenhaToken
        }
        return null
    }
}
