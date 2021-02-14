import CreateTestPlanDto from "./dtos/create_testplan.dto";
import TestPlanService from "./testplan.services";
import { NextFunction, Request, Response } from 'express';
import { ITestPlan } from ".";


export default class TestPlanController {
    private testplanService = new TestPlanService();

      public createTestPlan = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          console.log('hello');
          const projectId = req.params.id;
          const model: CreateTestPlanDto = req.body;
          const project = await this.testplanService.CreateTestPlan(model, projectId);
          res.status(200).json(project);
        } catch (error) {
          next(error);
        }
      };  
    
      public removeTestPlan = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const projectId = req.params.project_id;
          const userId = req.params.requirement_id;
          const group = await this.testplanService.removeTestPlan(projectId, userId);
          res.status(200).json(group);
        } catch (error) {
          next(error);
        }
      };

      public updateTestPlan = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const model: CreateTestPlanDto = req.body;
          const testplanId = req.params.id;
          const result = await this.testplanService.updateTestPlan(model, testplanId);
          res.status(200).json(result);
        } catch (error) {
          next(error);
        }
      };

      public getAllTestPlanOfProject = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const resultObj: Partial<ITestPlan>[] = 
          await this.testplanService.getAllTestPlanOfProject(req.params.project_id);
          res.status(200).json(resultObj);
        } catch (error) {
          next(error);
        }
      };
    
  }