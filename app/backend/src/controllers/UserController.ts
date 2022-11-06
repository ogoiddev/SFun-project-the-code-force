import { NextFunction, Request, Response } from 'express';
import CustomError from '../Error/CustomError';
import { IUserService } from '../interfaces/UserInterfaces';

export default class UserLoginController {
  constructor(private userService : IUserService) {}

  public async loginUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { cpf, password } = req.body;

      if (!cpf || !password) {
        throw new CustomError('All fields must be filled', 400);
      }

      const userLoginResponse = await this.userService.execute(req.body);

      res.status(200).json(userLoginResponse);
    } catch (error) {
      next(error);
    }
  }

  public async validateUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { token } = req.body;      

      const { username, email } = await this.userService.validate(token);

      res.status(200).json({ username, email, isTokenValid: true });
    } catch (error) {
      next(error);
    }
  }
}