import { Route } from "@core/interfaces";
import { authMiddleware, validationMiddleware } from "@core/middleware";
import { Router } from "express";
import CreateNotificationDto from "./dtos/create_notification.dto";
import NotificationController from "./notification.controller";

export default class TestPlanRoute implements Route {
    public path = '';
    public router = Router();
  
    public notificationController = new NotificationController();
  
    constructor() {
      this.initializeRoutes();
    }
  
    private initializeRoutes() {    

      this.router.post(
        this.path + '/createnotification',
        authMiddleware,
        validationMiddleware(CreateNotificationDto, true),
        this.notificationController.CreateNotification
      );

      this.router.get(
        this.path + '/api/v1/getallnotificationofuser',
        authMiddleware,
        this.notificationController.GetAllNotificationOfUser
      );

      this.router.put(
        this.path + '/api/updatenotification',
        authMiddleware,
        this.notificationController.UpdateNotification
      );

    }
}