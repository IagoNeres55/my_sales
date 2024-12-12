import { NextFunction, Request, Response } from 'express'
import AppError from '../erros/AppError'

export default class ErrorHandleMiddleware {
  public static handleError(
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ): void {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({
        type: 'error',
        message: error.message,
      })
      return
    }
    res.status(500).json({
      message: 'Internal Server Error',
    })
    return
  }
}
