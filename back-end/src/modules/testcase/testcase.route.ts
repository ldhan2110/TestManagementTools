import { Route } from "@core/interfaces";
import { authMiddleware, validationMiddleware } from "@core/middleware";
import { Router } from "express";
import CreateTestCaseDto from "./dtos/create_testcase.dto";
import TestCaseController from "./testcase.controller";

export default class TestCaseRoute implements Route {
  public path = '/:project_id';
  public router = Router();

  public testcaseController = new TestCaseController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      this.path + '/create_testcase',
      authMiddleware,
      validationMiddleware(CreateTestCaseDto, true),
      this.testcaseController.CreateTestCase
    );

    this.router.post(
      this.path + '/api/addteststep',
      authMiddleware,
      validationMiddleware(CreateTestCaseDto, true),
      this.testcaseController.CreateTestCaseAndTestStep
    );

    this.router.post(
      this.path + '/api/importtestcase',
      authMiddleware,
      //validationMiddleware(CreateTestCaseDto, true),
      this.testcaseController.ImportTestcase
    );

    /*this.router.post(
      this.path + '/readfileexcel',
      authMiddleware,
      validationMiddleware(CreateTestCaseDto, true),
      this.testcaseController.ReadFileExcel
    );*/

    this.router.put(
      this.path + '/:testcase_id/api/updatetestcase',
      authMiddleware,
      validationMiddleware(CreateTestCaseDto, true),
      this.testcaseController.UpdateTestCase
    );

    this.router.delete(
      this.path + '/:testcase_id/api/deletetestcaseofproject',
      authMiddleware,
      this.testcaseController.DeleteTestCaseFromProject);

    this.router.get(
      this.path,
      authMiddleware,
      this.testcaseController.GetAllTestCaseOfTestSuite
    );

    this.router.get(
      this.path + '/api/get_all_testcase_of_project',
      authMiddleware,
      this.testcaseController.GetAllTestCaseOfProject
    );

    this.router.post(
      this.path + '/api/searchtestcase',
      authMiddleware,
      this.testcaseController.SearchTestcaseOfProject
    );

    this.router.post(
      this.path + '/api/searchtestcaseintestexecution',
      authMiddleware,
      this.testcaseController.SearchTestcaseInTestExecution
    );

    this.router.post(
      this.path + '/api/get_list_testcase',
      authMiddleware,
      this.testcaseController.GetListTestCase
    );


    this.router.put(
      this.path + '/:testsuite_id/:testcase_id/addtestsuite',
      authMiddleware,
      this.testcaseController.AddTestCaseForTestSuite
    );

    this.router.delete(
      this.path + '/:testsuite_id/:testcase_id',
      authMiddleware,
      this.testcaseController.RemoveTestCaseFromTestSuite
    );

    this.router.get(
      this.path + '/api/elasticsearch',
      //authMiddleware,
      this.testcaseController.TestElasticSearch
    );
  }
}