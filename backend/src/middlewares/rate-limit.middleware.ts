/* eslint-disable @typescript-eslint/no-explicit-any */
import rateLimit from 'express-rate-limit'
import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import { HttpExcecao } from 'src/utils/exception'

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
    private readonly limiter: ReturnType<typeof rateLimit>

    constructor() {
        const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10)
        const max = parseInt(process.env.RATE_LIMIT_MAX, 10)
        const message = process.env.RATE_LIMIT_MESSAGE

        if (isNaN(windowMs) || isNaN(max)) {
            throw new HttpExcecao('Rate limits invalidos no env.')
        }

        this.limiter = rateLimit({
            windowMs,
            max,
            message,
        })
    }

    use(req: Request, res: Response, next: NextFunction) {
        this.limiter(req, res, (err: any) => {
            if (err) {
                return res
                    .status(429)
                    .json({ error: process.env.RATE_LIMIT_MESSAGE })
            }
            next()
        })
    }
}
