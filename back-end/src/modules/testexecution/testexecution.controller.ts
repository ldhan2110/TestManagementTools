import CreateTestExecutionDto from "./dtos/create_testexecution.dto";
import TestExecutionService from "./testexecution.services";
import { NextFunction, Request, Response } from 'express';
import { ITestPlan } from "@modules/testplan";
import { ITestExecution } from "@modules/testexecution";
import ExecTestcaseDto from "./dtos/exec_testcase.dto";
import ExecTestexecutionDto from "./dtos/exec_testexecution.dto";
import DuplicateTestExecutionDto from "./dtos/duplicate_testexecution.dto";
import UpdateTestExecutionDto from "./dtos/update_testexecution.dto";
import RemoveIssueDto from "./dtos/remove_issue.dto";
import AddIssueToExecutionDto from "./dtos/add_issue.dto";




export default class TestExecutionController {
    private testexecutionService = new TestExecutionService();

      public CreateTestExecutionAndAddProject = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const projectId = req.params.project_id;
          const model: CreateTestExecutionDto = req.body;
          if(model.exist_testexecution !== undefined && model.exist_testexecution !== "" && model.exist_testexecution !== null){
            const testexecution = await this.testexecutionService.duplicateTestExecution(model, projectId);
          }
          else{
            const testexecution = await this.testexecutionService.createTestExecutionAndAddProject(model, projectId);
          }
          //if(model.assigntester !== undefined && model.assigntester !== "" && model.assigntester !== null){
            //const io = req.app.get('socketio');
            //io.emit('assigntester', `you has already been assigned for test execution ${model.testexecutionname} in project`);  
          //}
          res.status(200).json({status: 200, success: true, result:"success", errMsg:''});
        } catch (error) {
          //res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
          next(error);
        }
      };  

      public GetAllTestExecutionOfProject = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const resultObj: Partial<ITestExecution>[] = 
          await this.testexecutionService.getAllTestExecutionOfProject(req.params.project_id);
          //res.status(200).json(resultObj);
          res.status(200).json({status: 200, success: true, result:resultObj, errMsg:''});
        } catch (error) {
          //res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
          next(error);
        }
      };

      public GetSixTestExecutionNewest = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const testexecutions:any = 
          await this.testexecutionService.getSixTestExecutionNewest(req.params.project_id);
          //res.status(200).json(resultObj);
          res.status(200).json({status: 200, success: true, result:testexecutions, errMsg:''});
        } catch (error) {
          //res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
          next(error);
        }
      };

      public SearchTestExecutionOfProject = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const resultObj: Partial<ITestExecution>[] = 
          await this.testexecutionService.searchTestExecutionOfProject(req.params.project_id, req.body.keyword);
          //res.status(200).json(resultObj);
          res.status(200).json({status: 200, success: true, result:resultObj, errMsg:''});
        } catch (error) {
          //res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
          next(error);
        }
      };

      public ExecTestcase = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const model: ExecTestcaseDto = req.body;
          const testexecutionId = req.params.testexecution_id;
          const projectid = req.params.project_id;
          const result = await this.testexecutionService.execTestcase(model, testexecutionId, projectid, req.user.id);
          //res.status(200).json(result);
          res.status(200).json({status: 200, success: true, result:"success", errMsg:''});
        } catch (error) {
          //res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
          next(error);
        }
      };

      public ExecTestExecution = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const model: ExecTestexecutionDto = req.body;
          const testexecutionId = req.params.testexecution_id;
          const projectid = req.params.project_id;
          const result = await this.testexecutionService.execTestExecution(model, testexecutionId, projectid, req.user.id);
          //res.status(200).json(result);
          res.status(200).json({status: 200, success: true, result:"success", errMsg:''});
        } catch (error) {
          //res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
          next(error);
        }
      };

      public DuplicateTestExecution = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const projectId = req.params.project_id;
          const model: DuplicateTestExecutionDto = req.body;
          const testexecution = await this.testexecutionService.duplicateTestExecution(model, projectId);
          res.status(200).json({status: 200, success: true, result:testexecution, errMsg:''});
        } catch (error) {
          //res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
          next(error);
        }
      };
      
      public DeleteTestExecutionFromProject = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const projectId = req.params.project_id;
          const testexecution = await this.testexecutionService.deleteTestExecutionFromProject(projectId, req.params.testexecution_id);
          res.status(200).json({status: 200, success: true, result:"success", errMsg:''});
        } catch (error) {
          //res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
          next(error);
        }
      }; 

      public UpdateTestExecution = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const model: UpdateTestExecutionDto = req.body;
          const testexecutionId = req.params.testexecution_id;
          const projectid = req.params.project_id;
          const result = await this.testexecutionService.updateTestExecution(model, testexecutionId, projectid, req.user.id);
          //res.status(200).json(result);
          res.status(200).json({status: 200, success: true, result:"success", errMsg:''});
        } catch (error) {
          //res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
          next(error);
        }
      };

      public RemoveIssueFromTestExecution = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const projectId = req.params.project_id;
          const model: RemoveIssueDto = req.body;
          const testexecution = await this.testexecutionService.removeIssueFromTestExecution(projectId, model.testexecution_id, model.issue_id);
          res.status(200).json({status: 200, success: true, result:"success", errMsg:''});
        } catch (error) {
          //res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
          next(error);
        }
      }; 

      public AddIssueFromTestExecution = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const projectId = req.params.project_id;
          const model: AddIssueToExecutionDto = req.body;
          const testexecution = await this.testexecutionService.addIssueFromTestExecution(projectId, model.testexecution_id, model);
          res.status(200).json({status: 200, success: true, result:"success", errMsg:''});
        } catch (error) {
          //res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
          next(error);
        }
      }; 
    
}