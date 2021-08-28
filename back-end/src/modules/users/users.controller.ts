import { NextFunction, Request, Response } from 'express';

import RegisterDto from './dtos/register.dto';
import { TokenData } from '@modules/auth';
import UserService from './users.services';
import { transports } from 'winston';
import ResetPasswordDto from './dtos/reset_password.dto';
import UpdateProfileDto from './dtos/update_profile.dto';
import UpdatePasswordDto from './dtos/update_password.dto';
import UploadAvatarDto from './dtos/upload_avatar.dto';

export default class UsersController {
  private userService = new UserService();

  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const register_model: RegisterDto = req.body;
      const tokenData: TokenData = await this.userService.createUser(register_model);
      const io = req.app.get('socketio');
      io.emit('user_created', `${register_model.email} has been registered`);
      res.json({status: 201, success: true, result:tokenData, errMsg:''});
    } catch (error) {
      //res.json({status: error.status, success:false, result:'', errMsg: error.message});
      next(error);
    }
  };

  public getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = await this.userService.getUserById(req.params.id);
      //res.status(200).json(user);
      res.status(200).json({status: 200, success: true, result:user, errMsg:''});
    } catch (error) {
      res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
      next(error);
    }
  };

  public GetCurrentUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = await this.userService.getCurrentUser(req.user.id);
      //res.status(200).json(user);
      res.status(200).json({status: 200, success: true, result:user, errMsg:''});
    } catch (error) {
      //res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
      next(error);
    }
  };

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.userService.getAll();
      //res.status(200).json(users);
      res.status(200).json({status: 200, success: true, result:users, errMsg:''});
    } catch (error) {
      res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
      next(error);
    }
  };

  public getAllPaging = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const page = Number(req.params.page);
      const keyword = req.query.keyword || '';

      const paginationResult = await this.userService.getAllPaging(
        keyword.toString(),
        page
      );
      //res.status(200).json(paginationResult);
      res.status(200).json({status: 200, success: true, result:paginationResult, errMsg:''});
    } catch (error) {
      res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
      next(error);
    }
  };

  public updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const model: RegisterDto = req.body;
      const user = await this.userService.updateUser(req.params.id, model);
      const io = req.app.get('socketio');
      io.emit('user_updated', req.params.id);
      res.status(200).json({status: 200, success: true, result:user, errMsg:''});
    } catch (error) {
      res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
      next(error);
    }
  };

  public updateProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const model: UpdateProfileDto = req.body;
      const user = await this.userService.updateProfile(req.user.id, model);
      //res.status(200).json(user);
      res.status(200).json({status: 200, success: true, result:user, errMsg:''});
    } catch (error) {
      //res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
      next(error);
    }
  };

  public updatePasswordInProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const model: UpdatePasswordDto = req.body;
      const result = await this.userService.updatePasswordInProfile(req.user.id, model);
      //res.send('reset password successfully')   
      res.status(200).json({status: 200, success: true, result:'reset password successfully', errMsg:''});   
    } catch (error) {
      //res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
      next(error);
    }
  };

  public deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await this.userService.deleteUser(req.params.id);
      const io = req.app.get('socketio');
      io.emit('user_deleted', `User ${result.email} has been deleted.`);
      res.status(200).json({status: 200, success: true, result:result, errMsg:''});
    } catch (error) {
      res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
      next(error);
    }
  };

  public forgotPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const {email} = req.body;
      const link = await this.userService.forgotPassword(email);
      res.status(200).json({status: 200, success: true, result:'your email has been sent successfully', errMsg:''});   
    } catch (error) {
      //res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
      next(error);
    }
  };

  public updatePassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const model: ResetPasswordDto = req.body;
      //console.log('token: '+ JSON.stringify(req.headers['reset-token']));
      //console.log('userid: '+ JSON.stringify(req.user.id));
      //console.log('userid params: '+ req.params.id);
      const link = await this.userService.newPassword(req.user.id, model);
      //res.send('reset password successfully')   
      res.status(200).json({status: 200, success: true, result:'reset password successfully', errMsg:''});   
    } catch (error) {
      //res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
      next(error);
    }
  };

  public DeleteUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ids: string[] = req.body;
      const result = await this.userService.deleteUsers(ids);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  public UploadAvatar = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const model: UploadAvatarDto = req.body;
      const users = await this.userService.uploadAvatar(model,req.user.id);
      //res.status(200).json(users);
      res.status(200).json({status: 200, success: true, result:"success", errMsg:''});
    } catch (error) {
      //res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
      next(error);
    }
  };

}