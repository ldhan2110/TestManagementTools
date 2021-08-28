import { Route } from "@core/interfaces";
import { authMiddleware, isProjectManagerMiddleware, notAllowGuestMiddleware, validationMiddleware } from "@core/middleware";
import notAllowProjectManagerMiddleware from "@core/middleware/Role/notAllowProjectManager.middleware";
import { Router } from "express";
import AddIssueToExecutionDto from "./dtos/add_issue.dto";
import CreateTestExecutionDto from "./dtos/create_testexecution.dto";
import RemoveIssueDto from "./dtos/remove_issue.dto";
import UpdateTestExecutionDto from "./dtos/update_testexecution.dto";
import TestExecutionController from "./testexecution.controller";

export default class TestExecutionRoute implements Route {
    public path = '';
    public router = Router();
  
    public testexecutionController = new TestExecutionController();
  
    constructor() {
      this.initializeRoutes();
    }
  
    private initializeRoutes() {    

      this.router.post(
        this.path + '/:project_id/api/createtestexecution',
        authMiddleware,
        validationMiddleware(CreateTestExecutionDto),
        this.testexecutionController.CreateTestExecutionAndAddProject
      );

      this.router.post(
        this.path + '/:project_id/api/searchtestexecution',
        authMiddleware,
        this.testexecutionController.SearchTestExecutionOfProject
      );

      this.router.get(
        this.path + '/:project_id/api/getalltestexecutionofproject',
        authMiddleware,
        this.testexecutionController.GetAllTestExecutionOfProject
      );

      this.router.get(
        this.path + '/:project_id/api/getsixtestexecutionnewest',
        authMiddleware,
        this.testexecutionController.GetSixTestExecutionNewest
      );
 
      this.router.put(
        this.path + '/:project_id/:testexecution_id/api/updatetestcaseexec',
        authMiddleware,
        notAllowProjectManagerMiddleware,
        validationMiddleware(CreateTestExecutionDto, true),
        this.testexecutionController.ExecTestcase
      );

      this.router.put(
        this.path + '/:project_id/:testexecution_id/api/updatetestexecution',
        authMiddleware,
        notAllowProjectManagerMiddleware,
        validationMiddleware(CreateTestExecutionDto, true),
        this.testexecutionController.ExecTestExecution
      );

      this.router.post(
        this.path + '/:project_id/api/duplicateTesexecution',
        authMiddleware,
        this.testexecutionController.DuplicateTestExecution
      );

      this.router.delete(
        this.path + '/:project_id/:testexecution_id',
        authMiddleware,
        this.testexecutionController.DeleteTestExecutionFromProject
      );

      this.router.put(
        this.path + '/:project_id/:testexecution_id/api/updatedetailtestexecution',
        authMiddleware,
        validationMiddleware(UpdateTestExecutionDto, true),
        this.testexecutionController.UpdateTestExecution
      );

      this.router.put(
        this.path + '/:project_id/api/v1/removeissuefromexecution',
        authMiddleware,
        validationMiddleware(RemoveIssueDto, true),
        this.testexecutionController.RemoveIssueFromTestExecution
      );

      this.router.put(
        this.path + '/:project_id/api/v1/addissuetoexecution',
        authMiddleware,
        validationMiddleware(AddIssueToExecutionDto, true),
        this.testexecutionController.AddIssueFromTestExecution
      );

      /*this.router.get(
        this.path + '/:project_id/getalltestexecutionactive',
        authMiddleware,
        this.testexecutionController.GetAllTestExecutionOfProjectActive
      );*/
    }
}