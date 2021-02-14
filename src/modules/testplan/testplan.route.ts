import { Route } from "@core/interfaces";
import { authMiddleware, validationMiddleware } from "@core/middleware";
import { Router } from "express";
import CreateTestPlanDto from "./dtos/create_testplan.dto";
import TestPlanController from "./testplan.controller";

export default class TestPlanRoute implements Route {
    public path = '/api/v1/project/testplan';
    public router = Router();
  
    public testplanController = new TestPlanController();
  
    constructor() {
      this.initializeRoutes();
    }
  
    private initializeRoutes() {    

      this.router.post(
        this.path + '/:id',
        authMiddleware,
        validationMiddleware(CreateTestPlanDto, true),
        this.testplanController.createTestPlan
      );
  
      this.router.delete(
        this.path + '/:project_id/:requirement_id',
        authMiddleware,
        this.testplanController.removeTestPlan
      );

      this.router.put(
        this.path + '/:id',
        authMiddleware,
        validationMiddleware(CreateTestPlanDto, true),
        this.testplanController.updateTestPlan
      );

      this.router.get(
        this.path + '/getallrequirement/:project_id',
        authMiddleware,
        this.testplanController.getAllTestPlanOfProject
      );
    }
}