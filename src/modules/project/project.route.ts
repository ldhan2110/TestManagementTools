import { Route } from "@core/interfaces";
import { authMiddleware, validationMiddleware } from "@core/middleware";
import { Router } from "express";
import CreateProjectDto from "./dtos/create_project.dto";
import SetMemberDto from "./dtos/set_member.dto";
import ProjectController from "./project.controller";

export default class ProjectRoute implements Route {
    public path = '/api/v1/project';
    public router = Router();
  
    public projectController = new ProjectController();
  
    constructor() {
      this.initializeRoutes();
    }
  
    private initializeRoutes() {
      // Project
      this.router.post(
        this.path,
        authMiddleware,
        validationMiddleware(CreateProjectDto, true),
        this.projectController.createProject
      );
  
      this.router.put(
        this.path + '/:id',
        authMiddleware,
        validationMiddleware(CreateProjectDto, true),
        this.projectController.updateProject
      );
      
      this.router.get(
        this.path + '/allproject', 
        this.projectController.getAll
      );

      this.router.get(
        this.path, 
        authMiddleware, 
        this.projectController.getAllProjectByCreatedUser
      );
  
      this.router.delete(this.path + '/:id', this.projectController.deleteProject);

      this.router.get(
        this.path + '/members/:id',
        this.projectController.getAllMembers
      );

      this.router.post(
        this.path + '/members/:id',
        authMiddleware,
        validationMiddleware(SetMemberDto, true),
        this.projectController.addMember
      );
  
      this.router.delete(
        this.path + '/members/:project_id/:user_id',
        authMiddleware,
        this.projectController.removeMember
      );
    }
}