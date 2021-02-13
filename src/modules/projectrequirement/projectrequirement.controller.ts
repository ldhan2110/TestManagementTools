import ProjectRequirementService from "./projectrequirement.services";
import { NextFunction, Request, Response } from 'express';
import CreateProjectRequirementDto from "./dtos/create_projectrequirement.dto";



export default class ProjectController {
    private projectrequirementService = new ProjectRequirementService();

      public createRequirement = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const projectId = req.params.id;
          const model: CreateProjectRequirementDto = req.body;
          const project = await this.projectrequirementService.CreateRequirement(model, projectId);
          res.status(200).json(project);
        } catch (error) {
          next(error);
        }
      };  
    
      public removeRequirement = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const projectId = req.params.project_id;
          const userId = req.params.requirement_id;
          const group = await this.projectrequirementService.removeRequirement(projectId, userId);
          res.status(200).json(group);
        } catch (error) {
          next(error);
        }
      };
    
  }