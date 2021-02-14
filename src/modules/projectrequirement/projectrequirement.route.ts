import { Route } from "@core/interfaces";
import { authMiddleware, validationMiddleware } from "@core/middleware";
import { Router } from "express";
import CreateProjectRequirementDto from "./dtos/create_projectrequirement.dto";
import ProjectRequirementController from "./projectrequirement.controller";


export default class ProjectRequirementRoute implements Route {
    public path = '/api/v1/project/requirement';
    public router = Router();
  
    public projectrequirementController = new ProjectRequirementController();
  
    constructor() {
      this.initializeRoutes();
    }
  
    private initializeRoutes() {    

      this.router.post(
        this.path + '/:id',
        authMiddleware,
        validationMiddleware(CreateProjectRequirementDto, true),
        this.projectrequirementController.createRequirement
      );
  
      this.router.delete(
        this.path + '/:project_id/:requirement_id',
        authMiddleware,
        this.projectrequirementController.removeRequirement
      );

      this.router.put(
        this.path + '/:id',
        authMiddleware,
        validationMiddleware(CreateProjectRequirementDto, true),
        this.projectrequirementController.updateProjectRequirement
      );

      this.router.get(
        this.path + '/getallrequirement/:project_id',
        authMiddleware,
        this.projectrequirementController.getAllRequirement
      );
    }
}