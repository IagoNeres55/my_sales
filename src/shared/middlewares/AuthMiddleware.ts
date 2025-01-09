import { Secret, verify } from 'jsonwebtoken'
import 'dotenv/config'

import { NextFunction, Request, Response } from 'express'
import { usersRepositories } from '@modules/users/infra/database/repositories/UserRepositories'
import AppError from '@shared/erros/AppError'

interface ITokenPayload {
  iat: number
  exp: number
  sub: string
}

const JWT_SECRET = process.env.SECRET_KEY_JWT as Secret

export default class AuthMiddleware {
  public static execute(
    request: Request,
    _response: Response,
    next: NextFunction,
  ): void {
    const tokenHeaders = request.headers.authorization

    if (!tokenHeaders) {
      throw new AppError('JWT Token não informado', 401)
    }

    const [, token] = tokenHeaders.split(' ') as string[]

    // if (!/^Bearer$/i.test(bearer)) {
    //   response.status(401).send({ message: 'Token fora do formato Bearer' })
    //   return
    // }

    try {
      const decodedToken = verify(token, JWT_SECRET as Secret)

      const { sub } = decodedToken as ITokenPayload

      request.user = {
        id: sub,
      }

      return next()
    } catch (error) {
      throw new AppError('JWT TOKEN INVALIDO')
    }
  }
}
