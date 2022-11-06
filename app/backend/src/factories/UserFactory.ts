import UserService from '../services/UserService';
import UserController from '../controllers/UserController';

export default class UserFactory {
  static make() {
    const userService = new UserService();
    const userController = new UserController(userService);

    return userController;
  }
}