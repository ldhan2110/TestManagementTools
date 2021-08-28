import { NextFunction, Request, Response } from 'express';

import AuthService from './auth.service';
import LoginDto from './auth.dto';
import { TokenData } from '@modules/auth';
import RespondDto from '@modules/users/dtos/respond.dto';
import { LoginData } from '@core/interfaces';

export default class AuthController {
  private authService = new AuthService();

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const login_model: LoginDto = req.body;
      const logindata: LoginData = await this.authService.login(login_model);
      const io = req.app.get('socketio');
      io.emit('login', `login successfully`);
      res.json({status: 200, success: true, result:logindata, errMsg:''});
    } catch (error) {
      const errorstatus = error.status;
      res.status(errorstatus).json({status: error.status, success:false, result:'', errMsg: error.message});
      next(error);
    }
  };

  public refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refreshToken = req.body.refreshToken;
      const tokenData: TokenData = await this.authService.refreshToken(refreshToken);
      //res.status(200).json(tokenData);
      res.json({status: 200, success: true, result:tokenData, errMsg:''});
    } catch (error) {
      next(error);
    }
  };

  public revokeToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.body.token;
      await this.authService.revokeToken(token);
      res.status(200);
    } catch (error) {
      next(error);
    }
  };

  public getCurrentLoginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.authService.getCurrentLoginUser(req.user.id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };
}
