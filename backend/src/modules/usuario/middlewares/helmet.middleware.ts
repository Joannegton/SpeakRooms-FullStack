import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response } from 'express'
import helmet from 'helmet'

@Injectable()
export class HelmetMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: () => void) {
        helmet({
            contentSecurityPolicy: false,
            crossOriginResourcePolicy: { policy: 'cross-origin' },
            dnsPrefetchControl: { allow: true },
            frameguard: { action: 'deny' },
            hsts: { maxAge: 31536000, includeSubDomains: true },
            ieNoOpen: true,
            noSniff: true,
            permittedCrossDomainPolicies: { permittedPolicies: 'none' },
            referrerPolicy: { policy: 'no-referrer' },
            xssFilter: true,
        })(req, res, next)
    }
}
