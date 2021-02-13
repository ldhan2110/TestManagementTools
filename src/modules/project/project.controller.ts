import ProjectService from "./project.services";
import { NextFunction, Request, Response } from 'express';
import CreateProjectDto from "./dtos/create_project.dto";
import SetMemberDto from "./dtos/set_member.dto";

export default class ProjectController {
    private projectService = new ProjectService();
  
    public createProject = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const model: CreateProjectDto = req.body;
          const result = await this.projectService.createProject(req.user.id, model);
          res.status(201).json(result);
        } catch (error) {
          next(error);
        }
      };
    
      public getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
          const projects = await this.projectService.getAllProject();
          res.status(200).json(projects);
        } catch (error) {
          next(error);
        }
      };

      public getAllProjectByCreatedUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
          const model: CreateProjectDto = req.body;
          const projects = await this.projectService.getAllProjectByCreatedUser(req.user.id);
          res.status(200).json(projects);
        } catch (error) {
          next(error);
        }
      };
    
      public updateProject = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const model: CreateProjectDto = req.body;
          const projectId = req.params.id;
          const result = await this.projectService.updateProject(projectId, model, req.user.id);
          res.status(200).json(result);
        } catch (error) {
          next(error);
        }
      };
    
      public deleteProject = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const projectId = req.params.id;
          const projects = await this.projectService.deleteProject(projectId);
          res.status(200).json(projects);
        } catch (error) {
          next(error);
        }
      };

      public getAllMembers = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const projectId = req.params.id;
          const members = await this.projectService.getAllMembers(projectId);
          res.status(200).json(members);
        } catch (error) {
          next(error);
        }
      };

      public addMember = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const projectId = req.params.id;
          const model: SetMemberDto = req.body;
          const project = await this.projectService.addMember(model, projectId);
          res.status(200).json(project);
        } catch (error) {
          next(error);
        }
      };  
    
      public removeMember = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const projectId = req.params.project_id;
          const userId = req.params.user_id;
          const group = await this.projectService.removeMember(projectId, userId);
          res.status(200).json(group);
        } catch (error) {
          next(error);
        }
      };
    
  }