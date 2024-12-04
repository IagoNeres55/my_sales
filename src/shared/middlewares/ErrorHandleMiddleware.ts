import { NextFunction, Request, Response } from 'express'
import AppError from '../erros/AppError'

class ErrorHandleMiddleware {
  public static handleError(
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        type: 'error',
        message: error.message,
      });
    }
    return res.status(500).json({
      message: 'Internal Server Error',
    })
  }
}

export default ErrorHandleMiddleware
