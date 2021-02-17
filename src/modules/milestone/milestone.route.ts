import { Route } from "@core/interfaces";
import { authMiddleware, validationMiddleware } from "@core/middleware";
import { Router } from "express";
import CreateMilestoneDto from "./dtos/create_milestone.dto";
import MilestoneController from "./milestone.controller";

export default class TestPlanRoute implements Route {
    public path = '/api/v1/project/testplan/milestone';
    public router = Router();
  
    public milestoneController = new MilestoneController();
  
    constructor() {
      this.initializeRoutes();
    }
  
    private initializeRoutes() {    

      this.router.post(
        this.path + '/:testplanId',
        authMiddleware,
        validationMiddleware(CreateMilestoneDto, true),
        this.milestoneController.createMilestone
      );
  
      this.router.delete(
        this.path + '/:testplan_id/:milestone_id',
        authMiddleware,
        this.milestoneController.removeMilestone
      );

      this.router.put(
        this.path + '/:milestoneId',
        authMiddleware,
        validationMiddleware(CreateMilestoneDto, true),
        this.milestoneController.updateMilestone
      );

      this.router.get(
        this.path + '/getallmilestone/:testplan_id',
        authMiddleware,
        this.milestoneController.getAllMilestoneOfTestPlan
      );
    }
}