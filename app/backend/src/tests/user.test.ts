import * as sinon from 'sinon';
import * as chai from 'chai';
import UserModel from '../database/models/UserModel';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');
import { expect } from 'chai';
import { describe} from 'mocha';

import app from '../app';

chai.use(chaiHttp)

import { userLoginRequest, userMock, userLoginResponse } from './mocks/userMocks';
import { Response } from 'express';

describe('\"/login\" route', () => {
  let chaiHttpResponse: Response;

  beforeEach(() => {
    sinon.stub(UserModel, 'findOne').resolves(userMock as UserModel)
  });

  afterEach(()=>{
    (UserModel.findOne as sinon.SinonStub).restore();
  })

  it('retorna status 200', async  () => {
    const response = await chai.request(app)
      .post('/login')
      .send(userLoginRequest)
    
    expect(response.status).to.equal(200);
  })

  it('retorna as informações do usuário', async () => {
    const response = await chai
       .request(app)
       .post('/login')
       .send(userLoginRequest)

    expect(response.body.username).to.deep.equal(userLoginResponse.username);
  });
});
