import { ILoginRequest, IUserLoginResponse } from '../../interfaces/UserInterfaces'

const userMock = {
  id: 1,
  username: 'guilherme',
  cpf: '12345678900',
  email: 'guilherme@email.com',
  password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
  birthDate: '01-01-1990'
}
// senha: secret_user

const userLoginResponse: IUserLoginResponse = {
  username: 'guilherme',
  token: 'my_token'
}

const userLoginRequest: ILoginRequest = {
  cpf: '12345678900',
  password: "secret_admin",
}

export {
  userMock,
  userLoginResponse,
  userLoginRequest,
}