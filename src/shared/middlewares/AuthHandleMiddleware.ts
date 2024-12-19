import jwt, { VerifyErrors } from 'jsonwebtoken'
import 'dotenv/config'

import { NextFunction, Request, Response } from 'express'
import { usersRepositories } from '@modules/users/database/repositories/UserRepositories'

const JWT_SECRET = process.env.SECRET_KEY_JWT as string

export default class AuthHandleMiddleware {
  public static HandleAuth(
    request: Request,
    response: Response,
    _next: NextFunction,
  ) {
    const tokenHeaders = request.headers.authorization

    if (!tokenHeaders) {
      response.status(401).json({ message: 'token not informat!' })
      return
    }
    const divideToken = tokenHeaders.split(' ') as string[]

    if (divideToken?.length !== 2) {
      response.status(401).json({ message: 'token invalido' })
      return
    }

    const [bearer, token]: string[] = divideToken

    if (!/^Bearer$/i.test(bearer)) {
      response.status(401).send({ message: 'Token fora do formato Bearer' })
      return
    }

    jwt.verify(
      token,
      JWT_SECRET,
      async (err: VerifyErrors | null, decoded: any) => {
        if (err) {
          response.status(401).json({ message: 'Invalid token!' })
          return
        }

        if (!decoded || !decoded.id) {
          response.status(401).json({ message: 'Invalid token payload!' })
          return
        }

        const user = await usersRepositories.findById(decoded.id)

        if (!user || !user.id) {
          response.status(401).send({ message: 'token invalido' })
          return
        }

        // req.user = user as User | any
        // next()
      },
    )
  }
}
