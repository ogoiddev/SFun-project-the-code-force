import { Request, Response, NextFunction } from 'express';
import CustomError from '../Error/CustomError';
import TokenService from '../services/tokenService';

export default async function ValidateToken(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  try {
    const token = req.headers.authorization;
    if (!token) throw new CustomError('Token must be a valid token', 401);
    const tokenInfo = TokenService.validateToken(token);

    if (!tokenInfo.email) {
      throw new CustomError('Token must be a valid token', 401);
    }

    req.body.tokenEmail = tokenInfo.email;
    next();
  } catch (error) {
    const customError = error as CustomError;
    next(customError);
  }
}
