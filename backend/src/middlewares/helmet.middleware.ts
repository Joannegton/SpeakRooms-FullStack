import helmet from 'helmet'
import { Request, Response } from 'express'

export function helmetMiddleware(
    req: Request,
    res: Response,
    next: (err?: unknown) => void,
) {
    helmet({
        contentSecurityPolicy: false,
        crossOriginResourcePolicy: { policy: 'same-origin' },
        dnsPrefetchControl: { allow: true },
        frameguard: { action: 'deny' },
        hsts: { maxAge: 31536000, includeSubDomains: true },
        ieNoOpen: true,
        noSniff: true,
        permittedCrossDomainPolicies: { permittedPolicies: 'none' },
        referrerPolicy: { policy: 'no-referrer' },
    })(req, res, next)
}
