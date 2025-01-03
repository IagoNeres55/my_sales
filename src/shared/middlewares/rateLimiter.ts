import AppError from '@shared/erros/AppError'
import { NextFunction, Request, Response } from 'express'
import { RateLimiterRedis } from 'rate-limiter-flexible'
import { createClient } from 'redis'

//criar um limitardor para não fazer diversas consultas na api

const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  password: process.env.REDIS_PASS || undefined,
})

redisClient.connect().catch(console.error)

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'ratelimit',
  points: 5,
  duration: 5,
})

export default async function rateLimiter(
  request: Request,
  _response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    await limiter.consume(request.ip as string)

    return next()
  } catch (err) {
    throw new AppError('Too many requst.', 429)
  }
}
