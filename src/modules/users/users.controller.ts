import { NextFunction, Request, Response } from 'express';

import RegisterDto from './dtos/register.dto';
import { TokenData } from '@modules/auth';
import UserService from './users.services';
import { transports } from 'winston';

export default class UsersController {
  private userService = new UserService();

  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const model: RegisterDto = req.body;
      const tokenData: TokenData = await this.userService.createUser(model);
      res.status(201).json(tokenData);
    } catch (error) {
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
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.userService.getAll();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  };

  public getAllPaging = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const page: number = Number(req.params.page);
      const keyword = req.query.keyword || '';

      const paginationResult = await this.userService.getAllPaging(
        keyword.toString(),
        page
      );
      res.status(200).json(paginationResult);
    } catch (error) {
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
      res.status(200).json(user);
    } catch (error) {
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
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  public forgotPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      console.log('hello');
      const {email} = req.body;
      const link = await this.userService.sendEmail(email);
      res.send('your email has been sent successfully')   
    } catch (error) {
      next(error);
    }
  };

  public updatePassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const {new_password} = req.body;
      console.log(new_password);
      const link = await this.userService.newPassword(req.params.id, new_password);
      res.send('your email has been sent successfully')   
    } catch (error) {
      next(error);
    }
  };

}