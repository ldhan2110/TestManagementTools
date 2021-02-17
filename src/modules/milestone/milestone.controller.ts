import { NextFunction, Request, Response } from 'express';
import { IMilestone } from '.';
import CreateMilestoneDto from './dtos/create_milestone.dto';
import MilestoneService from './milestone.services';


export default class MilestoneController {
    private milestoneService = new MilestoneService();

      public createMilestone = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const testplanId = req.params.testplanId;
          const model: CreateMilestoneDto = req.body;
          const project = await this.milestoneService.CreateMilestone(model, testplanId);
          res.status(200).json(project);
        } catch (error) {
          next(error);
        }
      };  
    
      public removeMilestone = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const testplanId = req.params.testplan_id;
          const milestoneId = req.params.milestone_id;
          const group = await this.milestoneService.removeMilestone(testplanId, milestoneId);
          res.status(200).json(group);
        } catch (error) {
          next(error);
        }
      };

      public updateMilestone = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const model: CreateMilestoneDto = req.body;
          const milestoneId = req.params.milestoneId;
          const result = await this.milestoneService.updateMilestone(model, milestoneId);
          res.status(200).json(result);
        } catch (error) {
          next(error);
        }
      };

      public getAllMilestoneOfTestPlan = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const resultObj: Partial<IMilestone>[] = 
          await this.milestoneService.getAllMilestoneOfProject(req.params.testplan_id);
          res.status(200).json(resultObj);
        } catch (error) {
          next(error);
        }
      };
    
  }