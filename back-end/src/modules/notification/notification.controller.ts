import { NextFunction, Request, Response } from 'express';
import { INotification } from '.';
import CreateNotificationDto from './dtos/create_notification.dto';
import UpdateNotificationDto from './dtos/update_notification.dto';
import NotificationService from './notification.services';


export default class NotificationController {
    private notificationService = new NotificationService();

      public CreateNotification = async (
      req: Request,
      res: Response,
      next: NextFunction
      ) => {
      try {
        const projectId = req.params.project_id;
        const model: CreateNotificationDto = req.body;
        const project = await this.notificationService.createNotification(model, projectId);
        //res.status(200).json(project);
        res.status(200).json({status: 200, success: true, result:project, errMsg:''});
      } catch (error) {
        //res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
        next(error);
      }
      };

      public GetAllNotificationOfUser = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const resultObj: any = 
          await this.notificationService.getAllNotificationOfUser(req.user.id);
          //res.status(200).json(resultObj);
          res.status(200).json({status: 200, success: true, result:resultObj, errMsg:''});
        } catch (error) {
          //res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
          next(error);
        }
      };

      public UpdateNotification = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const model: UpdateNotificationDto = req.body
          const resultObj: any = 
          await this.notificationService.updateNotification(model);
          //res.status(200).json(resultObj);
          res.status(200).json({status: 200, success: true, result:"success", errMsg:''});
        } catch (error) {
          //res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
          next(error);
        }
      };
  
  }