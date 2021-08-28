import { Route } from "@core/interfaces";
import { authMiddleware, validationMiddleware } from "@core/middleware";
import { Router } from "express";
import CreateMilestoneDto from "./dtos/create_milestone.dto";
import MilestoneController from "./milestone.controller";

export default class TestPlanRoute implements Route {
    public path = '/:project_id';
    public router = Router();
  
    public milestoneController = new MilestoneController();
  
    constructor() {
      this.initializeRoutes();
    }
  
    private initializeRoutes() {    

      this.router.post(
        this.path + '/createmilestone',
        authMiddleware,
        validationMiddleware(CreateMilestoneDto, true),
        this.milestoneController.CreateMilestoneAndAddProject
      );

      this.router.put(
        this.path + '/:testplan_id/:milestone_id',
        authMiddleware,
        this.milestoneController.AddMilestoneForTestPlan
      );

      this.router.post(
        this.path + '/:testplan_Id',
        authMiddleware,
        validationMiddleware(CreateMilestoneDto, true),
        this.milestoneController.CreateMilestoneAndAddTestPlan
      );

      this.router.post(
        this.path + '/api/searchmilestone',
        authMiddleware,
        this.milestoneController.SearchMilestoneOfProject
      );

      this.router.get(
        this.path + '/getallmilestoneofproject',
        authMiddleware,
        this.milestoneController.GetAllMilestoneOfProject
      );

      this.router.get(
        this.path + '/:testplan_id',
        authMiddleware,
        this.milestoneController.GetAllMilestoneOfTestPlan
      );

      this.router.get(
        this.path + '/:milestone_id/getbyid',
        authMiddleware,
        this.milestoneController.GetMilestoneById
      );

      this.router.put(
        this.path + '/:milestone_id/api/updatemilestone',
        authMiddleware,
        validationMiddleware(CreateMilestoneDto, true),
        this.milestoneController.UpdateMilestone
      );
  
      this.router.delete(
        this.path + '/:testplan_id/:milestone_id',
        authMiddleware,
        this.milestoneController.RemoveMilestoneFromTestPlan
      );
  
      this.router.delete(
        this.path + '/:milestone_id/api/removeanddeletefromproject',
        authMiddleware,
        this.milestoneController.RemoveAndDeleteMilestoneFromProject
      );

      this.router.delete(
        this.path + '/:testplan_id/:milestone_id/removeanddelete',
        authMiddleware,
        this.milestoneController.RemoveAndDeleteMilestoneFromTestPlan
      );

    }
}