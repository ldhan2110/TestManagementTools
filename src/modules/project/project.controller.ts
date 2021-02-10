import ProjectService from "./project.services";
import { NextFunction, Request, Response } from 'express';

export default class ProjectController {
    private projectService = new ProjectService();
  
    public createProject = async (req: Request, res: Response, next: NextFunction) => {
        res.send('reset password successfully')
    };
  
  
  }