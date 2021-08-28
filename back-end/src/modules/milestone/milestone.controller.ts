import { NextFunction, Request, Response } from 'express';
import { IMilestone } from '.';
import CreateMilestoneDto from './dtos/create_milestone.dto';
import MilestoneService from './milestone.services';


export default class MilestoneController {
    private milestoneService = new MilestoneService();

      public CreateMilestoneAndAddProject = async (
      req: Request,
      res: Response,
      next: NextFunction
      ) => {
      try {
        const projectId = req.params.project_id;
        const model: CreateMilestoneDto = req.body;
        const project = await this.milestoneService.createMilestoneAndAddProject(model, projectId);
        //res.status(200).json(project);
        res.status(200).json({status: 200, success: true, result:project, errMsg:''});
      } catch (error) {
        //res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
        next(error);
      }
      };
    
      public AddMilestoneForTestPlan = async (
      req: Request,
      res: Response,
      next: NextFunction
      ) => {
      try {
        const testplanId = req.params.testplan_id;
        const milestoneId = req.params.milestone_id;
        const testplan = await this.milestoneService.addMilestoneForTestPlan(testplanId, milestoneId);
        //res.status(200).json(testplan);
        res.status(200).json({status: 200, success: true, result:testplan, errMsg:''});
      } catch (error) {
        res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
        next(error);
      }
      };

      public CreateMilestoneAndAddTestPlan = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const projectId = req.params.project_id;
          const testplanId = req.params.testplan_Id;
          const model: CreateMilestoneDto = req.body;
          const project = await this.milestoneService.createMilestoneAndAddTestPlan(model, projectId, testplanId);
          //res.status(200).json(project);
          res.status(200).json({status: 200, success: true, result:project, errMsg:''});
        } catch (error) {
          res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
          next(error);
        }
      };

      public GetAllMilestoneOfProject = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const resultObj: Partial<IMilestone>[] = 
          await this.milestoneService.getAllMilestoneOfProject(req.params.project_id);
          //res.status(200).json(resultObj);
          res.status(200).json({status: 200, success: true, result:resultObj, errMsg:''});
        } catch (error) {
          res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
          next(error);
        }
      };
 
      public SearchMilestoneOfProject = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const resultObj: Partial<IMilestone>[] = 
          await this.milestoneService.searchMilestoneOfProject(req.params.project_id, req.body.keyword);
          //res.status(200).json(resultObj);
          res.status(200).json({status: 200, success: true, result:resultObj, errMsg:''});
        } catch (error) {
          //res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
          next(error);
        }
      };

      public GetAllMilestoneOfTestPlan = async (
        req: Request,
        res: Response,
        next: NextFunction
        ) => {
        try {
          const resultObj: Partial<IMilestone>[] = 
          await this.milestoneService.getAllMilestoneOfTestPlan(req.params.testplan_id);
          //res.status(200).json(resultObj);
          res.status(200).json({status: 200, success: true, result:resultObj, errMsg:''});
        } catch (error) {
          res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
          next(error);
        }
      };

      public GetMilestoneById = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const user = await this.milestoneService.getMilestoneById(req.params.milestone_id);
          //res.status(200).json(user);
          res.status(200).json({status: 200, success: true, result:user, errMsg:''});
        } catch (error) {
          res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
          next(error);
        }
      };

      public UpdateMilestone = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const model: CreateMilestoneDto = req.body;
          const milestoneId = req.params.milestone_id;
          const projectId = req.params.project_id;
          const result = await this.milestoneService.updateMilestone(model, milestoneId, projectId);
          //res.status(200).json(result);
          res.status(200).json({status: 200, success: true, result:result, errMsg:''});
        } catch (error) {
          //res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
          next(error);
        }
      };

      public RemoveMilestoneFromTestPlan = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
            const testplanId = req.params.testplan_id;
            const milestoneId = req.params.milestone_id;
          const milestone = await this.milestoneService.removeMilestoneFromTestPlan(testplanId, milestoneId);
          //res.status(200).json(group);
          res.status(200).json({status: 200, success: true, result:milestone, errMsg:''});

        } catch (error) {
          res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
          next(error);
        }
      };
    
      public RemoveAndDeleteMilestoneFromProject = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const projectId = req.params.project_id;
          const milestoneId = req.params.milestone_id;
          const group = await this.milestoneService.removeAndDeleteMilestoneFromProject(projectId, milestoneId);
          //res.status(200).json(group);
          res.status(200).json({status: 200, success: true, result:group, errMsg:''});
        } catch (error) {
          next(error);
        }
      };

      public RemoveAndDeleteMilestoneFromTestPlan = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const projectId = req.params.project_id;
          const testplanId = req.params.testplan_id;
          const milestoneId = req.params.milestone_id;
          const group = await this.milestoneService.removeAndDeleteMilestoneFromTestPlan(projectId, testplanId, milestoneId);
          //res.status(200).json(group);
          res.status(200).json({status: 200, success: true, result:group, errMsg:''});
        } catch (error) {
          res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
          next(error);
        }
      };
  
  }