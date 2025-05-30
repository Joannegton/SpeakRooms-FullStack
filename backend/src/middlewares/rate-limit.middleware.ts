import rateLimit from 'express-rate-limit'
import { Request, Response } from 'express'
import { HttpExcecao } from 'http-service-result'

const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10)
const max = parseInt(process.env.RATE_LIMIT_MAX, 10)
const message = process.env.RATE_LIMIT_MESSAGE

if (isNaN(windowMs) || isNaN(max)) {
    throw new HttpExcecao('Rate limits invalidos no env.')
}

export const rateLimitMiddleware = rateLimit({
    windowMs,
    max,
    message,
    handler: (req: Request, res: Response) => {
        res.status(429).json({ error: process.env.RATE_LIMIT_MESSAGE })
    },
})
