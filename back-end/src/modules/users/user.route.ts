import RegisterDto from './dtos/register.dto';
import { Route } from '@core/interfaces';
import { Router } from 'express';
import UsersController from './users.controller';
import { authMiddleware, resetMiddleware } from '@core/middleware';
import validationMiddleware from '@core/middleware/validation.middleware';
import UpdateProjectDto from '@modules/project/dtos/update_project.dto';
import UpdatePasswordDto from './dtos/update_password.dto';
import UpdateProfileDto from './dtos/update_profile.dto';

export default class UsersRoute implements Route {
  public path = '/users';
  public router = Router();

  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      this.path,
      validationMiddleware(RegisterDto),
      this.usersController.register
    );

    this.router.put(
      this.path + '/:id',
      validationMiddleware(RegisterDto),
      this.usersController.updateUser
    );

    this.router.put(
      this.path + '/api/updateprofile',
      authMiddleware,
      validationMiddleware(UpdateProfileDto),
      this.usersController.updateProfile
    );

    this.router.put(
      this.path + '/api/updatepassword',
      authMiddleware,
      validationMiddleware(UpdatePasswordDto),
      this.usersController.updatePasswordInProfile
    );

    this.router.get(
      this.path + '/:id', 
      this.usersController.getUserById);

    this.router.get(
      this.path + '/api/getcurrentuser',
      authMiddleware,
      this.usersController.GetCurrentUser);

    this.router.get(
      this.path,
      authMiddleware,
      this.usersController.getAll);

    this.router.get(
      this.path + '/paging/:page',
      this.usersController.getAllPaging
    );

    this.router.delete(
      this.path + '/:id',
      authMiddleware,
      this.usersController.deleteUser
    );

    this.router.post(
      this.path + '/forgotpassword',
      this.usersController.forgotPassword
    );

    this.router.put(
      this.path + '/api/resetpassword',
      resetMiddleware,
      this.usersController.updatePassword
    );

    this.router.put(
      this.path + '/api/uploadavatar',
      authMiddleware,
      this.usersController.UploadAvatar
    );

    this.router.delete(
      this.path,
      authMiddleware, 
      this.usersController.DeleteUsers);
    
  }
}