import { Route } from "@core/interfaces";
import { authMiddleware, isProjectManagerMiddleware, notAllowTesterMiddleware, validationMiddleware } from "@core/middleware";
import { Router } from "express";
import CreateTestPlanDto from "./dtos/create_testplan.dto";
import TestPlanController from "./testplan.controller";

export default class TestPlanRoute implements Route {
    public path = '';
    public router = Router();
  
    public testplanController = new TestPlanController();
  
    constructor() {
      this.initializeRoutes();
    }
  
    private initializeRoutes() {    

      this.router.post(
        this.path + '/:project_id/createtestplan',
        authMiddleware,
        notAllowTesterMiddleware,
        validationMiddleware(CreateTestPlanDto),
        this.testplanController.CreateTestPlanAndAddProject
      );
  
      /*this.router.delete(
        this.path + '/:project_id/:testplan_id/api/deletetestplan',
        authMiddleware,
        this.testplanController.DisableTestPlan
      );*/

      this.router.delete(
        this.path + '/:project_id/:testplan_id/api/deletetestplan',
        authMiddleware,
        notAllowTesterMiddleware,
        this.testplanController.RemoveAndDeleteTestPlan
      );

      this.router.put(
        this.path + '/:project_id/:testplan_id/api/updatetestplan',
        authMiddleware,
        notAllowTesterMiddleware,
        validationMiddleware(CreateTestPlanDto),
        this.testplanController.UpdateTestPlan
      );

      this.router.get(
        this.path + '/:project_id/getalltestplanbyid',
        authMiddleware,
        this.testplanController.GetAllTestPlanOfProject
      );

      this.router.get(
        this.path + '/:project_id/getalltestplanactive',
        authMiddleware,
        this.testplanController.GetAllTestPlanOfProjectActive
      );

      this.router.post(
        this.path + '/:project_id/api/searchtestplan',
        authMiddleware,
        this.testplanController.SearchTestPlanOfProject
      );

      this.router.post(
        this.path + '/:project_id/api/getallbuildoftestplan',
        authMiddleware,
        this.testplanController.GetAllBuildOfTestplan
      );

      this.router.get(
        this.path + '/:project_id/:testplan_id/api/duplicatetestplan',
        //authMiddleware,
        this.testplanController.DuplicateTestPlan
      );
    }
}