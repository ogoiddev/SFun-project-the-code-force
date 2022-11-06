import CustomError from '../Error/CustomError';
import UserModel from '../database/models/UserModel';
import {
  ILoginRequest,
  IUserLoginResponse,
  IUserService,
  IUserData,
} from '../interfaces/UserInterfaces';
import TokenService from './TokenService';
import HandleWithPassword from './PasswordService';

export default class UserService implements IUserService {
  private userLoginRequest: ILoginRequest;

  static async findByCpf(cpf: string): Promise<UserModel | null> {
    const user = await UserModel.findOne({ where: { cpf } });
    return user;
  }

  static async findByEmail(email: string): Promise<UserModel | null> {
    const user = await UserModel.findOne({ where: { email } });
    return user;
  }

  async execute(userLoginRequest: ILoginRequest): Promise<IUserLoginResponse> {
    this.userLoginRequest = userLoginRequest;
    const user = await UserService.findByCpf(userLoginRequest.cpf);
    if (!user) throw new CustomError('Incorrect cpf or password', 401);

    const { cpf, username, email }: IUserData = user;

    const isPasswordCorrect = await HandleWithPassword.comparePasswords(
      userLoginRequest.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new CustomError('Incorrect email or password', 401);
    }

    const token = TokenService.createToken({ cpf, username, email });

    return { username, token };
  }

  // eslint-disable-next-line class-methods-use-this
  async validate(token: string): Promise<UserModel> {
    const tokenInfo = TokenService.validateToken(token);
    
    const user = await UserService.findByCpf(tokenInfo.email);

    if (!user) throw new CustomError('Invalid Token', 401);

    return user;
  }
}
