import UserModel from '../database/models/UserModel';

interface ILoginRequest {
  cpf: string
  password: string
}

interface IUserData {
  cpf: string
  username: string
  email: string
}

interface IUserLoginResponse {
  username: string
  token: string
}

interface IUserService {
  execute(userInfo: ILoginRequest): Promise<IUserLoginResponse>
  validate(email: string): Promise<UserModel>
}

export {
  ILoginRequest,
  IUserService,
  IUserLoginResponse,
  IUserData,
};
