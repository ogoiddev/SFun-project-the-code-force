import { Router } from 'express';
import factory from '../factories';

const LoginRoutes = Router();

LoginRoutes.post('/login', (req, res, next) => {
  factory.userHandler.loginUser(req, res, next);
});

LoginRoutes.post('/validate', (req, res, next) => {
  factory.userHandler.validateUser(req, res, next);
});

export default LoginRoutes;
