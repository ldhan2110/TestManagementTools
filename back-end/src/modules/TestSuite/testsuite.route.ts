import { Route } from "@core/interfaces";
import { authMiddleware, validationMiddleware } from "@core/middleware";
import { Router } from "express";
import CreateTestSuiteDto from "./dtos/create_testsuite.dto";
import TestSuiteController from "./testsuite.controller";

export default class TestSuiteRoute implements Route {
    public path = '/:project_id';
    public router = Router();
  
    public testsuiteController = new TestSuiteController();
  
    constructor() {
      this.initializeRoutes();
    }
  
    private initializeRoutes() {

      this.router.post(
        this.path + '/api/create_testsuite',
        authMiddleware,
        validationMiddleware(CreateTestSuiteDto),
        this.testsuiteController.CreateTestSuiteAndAddProject
      );

      this.router.put(
        this.path + '/:testplan_id/:testsuite_id/add_to_testplan',
        authMiddleware,
        this.testsuiteController.AddTestSuiteForTestPlan
      );

      this.router.put(
        this.path + '/:testsuitedestination_id/:testsuite_id/add_to_testsuite',
        authMiddleware,
        this.testsuiteController.AddTestSuiteForTestSuite
      );


      this.router.post(
        this.path + '/:testplan_Id/addtotestplan',
        authMiddleware,
        validationMiddleware(CreateTestSuiteDto),
        this.testsuiteController.CreateTestSuiteAndAddTestPlan
      );

      this.router.get(
        this.path + '/api/getalltestsuite',
        authMiddleware,
        this.testsuiteController.GetAllTestSuiteOfProject
      );

      this.router.get(
        this.path + '/api/getalltestsuitenotree',
        authMiddleware,
        this.testsuiteController.GetAllTestSuiteOfProjectNoTree
      );

      this.router.get(
        this.path + '/api/getalltestsuiteonlyname',
        authMiddleware,
        this.testsuiteController.GetAllTestSuiteOfProjectOnlyName
      );

      this.router.get(
        this.path + '/:testplan_id/getalltestsuiteoftestplan',
        authMiddleware,
        this.testsuiteController.GetAllTestSuiteOfTestPlan
      );

      

      this.router.get(
        this.path + '/:testsuite_id/api/gettestsuitebyid',
        authMiddleware,
        this.testsuiteController.GetTestSuiteById
      );

      this.router.put(
        this.path + '/:testsuite_id/api/updatetestsuite',
        authMiddleware,
        validationMiddleware(CreateTestSuiteDto),
        this.testsuiteController.UpdateTestSuite
      );
  
      this.router.delete(
        this.path + '/:testplan_id/:testsuite_id',
        authMiddleware,
        this.testsuiteController.RemoveTestSuiteFromTestPlan
      );
  
      this.router.delete(
        this.path + '/:testsuite_id/api/deletetestsuitefromproject',
        authMiddleware,
        this.testsuiteController.RemoveAndDeleteTestSuiteFromProject
      );

      this.router.delete(
        this.path + '/:testplan_id/:testsuite_id/removeandelete',
        authMiddleware,
        this.testsuiteController.RemoveAndDeleteTestSuiteFromTestPlan
      );
    }
}