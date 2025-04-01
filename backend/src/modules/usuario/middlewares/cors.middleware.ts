import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response } from 'express'

@Injectable()
export class CorsMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: () => void) {
        const corsOptions = {
            origin: process.env.CORS_ORIGIN,
            methods: process.env.CORS_METHODS,
            allowedHeaders: ['Content-Type', 'Authorization'],
            exposedHeaders: ['pagination-pages', 'pagination-limit'],
        }
        res.setHeader('Access-Control-Allow-Origin', corsOptions.origin)
        res.setHeader('Access-Control-Allow-Methods', corsOptions.methods)
        res.setHeader(
            'Access-Control-Allow-Headers',
            corsOptions.allowedHeaders.join(', '),
        )
        res.setHeader(
            'Access-Control-Expose-Headers',
            corsOptions.exposedHeaders.join(', '),
        )
        next()
    }
}
