import { NextFunction, Request, Response } from 'express';
import TestCaseService from "./testcase.services";
import CreateTestCaseDto from "./dtos/create_testcase.dto";
import SearchTestcaseDto from './dtos/search_testcase.dto';

export default class TestCaseController {
  private testcaseService = new TestCaseService();

  public CreateTestCase = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const model: CreateTestCaseDto = req.body;
      const projectId = req.params.project_id;
      const result = await this.testcaseService.createTestCase(req.user.id, projectId, model);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

  public CreateTestCaseAndTestStep = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const model: CreateTestCaseDto = req.body;
      const projectId = req.params.project_id;
      const result = await this.testcaseService.createTestStepAndAddTestCase(model, req.user.id, projectId);
      res.status(200).json({ status: 200, success: true, result: "success", errMsg: '' });
    } catch (error) {
      next(error);
    }
  };

  public ImportTestcase = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const model: CreateTestCaseDto[] = req.body;
      const projectId = req.params.project_id;
      const result = await this.testcaseService.importTestcase(model, req.user.id, projectId);
      res.status(200).json({ status: 200, success: true, result: "success", errMsg: '' });
    } catch (error) {
      next(error);
    }
  };

  /*public ReadFileExcel = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const filename = req.body;
      //console.log(filename);
      const result = await this.testcaseService.readFileExcel(filename);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };*/

  public UpdateTestCase = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const model: CreateTestCaseDto = req.body;
      const testsuiteId = req.params.testcase_id;
      const projectId = req.params.project_id;
      const result = await this.testcaseService.updateTestCase(model, testsuiteId, req.user.id, projectId);
      res.status(200).json({ status: 200, success: true, result: "success", errMsg: '' });
    } catch (error) {
      next(error);
    }
  };

  public DeleteTestCaseFromProject = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const testcase = await this.testcaseService.deleteTestCaseFromProject(req.params.testcase_id);
      res.status(200).json({ status: 200, success: true, result: "success", errMsg: '' });
    } catch (error) {
      next(error);
    }
  };

  public GetAllTestCaseOfTestSuite = async (req: Request, res: Response, next: NextFunction) => {
    try {

      const testcases = await this.testcaseService.getAllTestCaseOfTestSuite(req.params.testplan_id);
      res.status(200).json({ status: 200, success: true, result: testcases, errMsg: '' });
    } catch (error) {
      next(error);
    }
  };

  public GetAllTestCaseOfProject = async (req: Request, res: Response, next: NextFunction) => {
    try {

      const testcases = await this.testcaseService.getAllTestCaseOfProject(req.params.project_id);
      res.status(200).json({ status: 200, success: true, result: testcases, errMsg: '' });
    } catch (error) {
      next(error);
    }
  };

  public GetListTestCase = async (req: Request, res: Response, next: NextFunction) => {
    try {

      const testcases = await this.testcaseService.getListTestCase(req.body);
      res.status(200).json({ status: 200, success: true, result: testcases, errMsg: '' });
    } catch (error) {
      next(error);
    }
  };

  public AddTestCaseForTestSuite = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const testsuiteId = req.params.testsuite_id;
      const testcaseId = req.params.testcase_id;
      const testsuite = await this.testcaseService.addTestCaseForTestSuite(testsuiteId, testcaseId);
      res.status(200).json(testsuite);
    } catch (error) {
      next(error);
    }
  };

  public RemoveTestCaseFromTestSuite = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const testsuiteId = req.params.testsuite_id;
      const testcaseId = req.params.testcase_id;
      const testsuite = await this.testcaseService.removeTestCaseFromTestSuite(testsuiteId, testcaseId);
      res.status(200).json(testsuite);
    } catch (error) {
      next(error);
    }
  };

  public SearchTestcaseOfProject = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const model: SearchTestcaseDto = req.body;
      const resultObj =
        await this.testcaseService.searchTestcaseOfProject(req.params.project_id, model);
      const resultObj3: any = resultObj.testsuites;
      //console.log(resultObj3);

      let array: any = {
        _id: resultObj3["_id"],
        name: resultObj3.projectname,
        description: resultObj3.description,
        type: 'root',
        total_testcase: resultObj.totalTCOfProject,
        numberof_testcaseuntest: resultObj.totalTNUntestOfProject,
        children: [
          {
            _id: { type: String },
            children: [],
            name: { type: String },
            description: { type: String },
            type: { type: String },
            priority: { type: String },
            is_assigned: { type: String },
            total_testcase: { type: Number },
            numberof_testcaseuntest: { type: Number },
            parent: { type: String }
          }
        ]
      }
      array.children.pop();

      let list: any = resultObj3["testsuite"];

      let array2: any = [{
        _id: { type: String },
        children: [],
        name: { type: String },
        description: { type: String },
        type: { type: String },
        priority: { type: String },
        is_assigned: { type: String },
        total_testcase: { type: Number },
        numberof_testcaseuntest: { type: Number },
        parent: { type: String }
      }]
      array2.pop();
      //let array2 = JSON.parse(JSON.stringify(array1));

      const convertList = (list: any) => {
        for (let i in list) {
          array2.push({
            _id: list[i]["_id"],
            name: list[i]["testsuitename"],
            description: list[i]["description"],
            type: list[i]["type"],
            priority: list[i]["priority"],
            is_assigned: list[i]["is_assigned"],
            total_testcase: list[i]["total_testcase"],
            numberof_testcaseuntest: list[i]["numberof_testcaseuntest"],
            parent: list[i]["testsuite_parent"],
            children: []
          });
          for (let j in list[i]["testsuite_child"]) {
            array2[i].children.push(list[i]["testsuite_child"][j]);
          }
          for (let k in list[i]["testcase"]) {
            array2[i].children.push(list[i]["testcase"][k]["_id"]);
          }

        }
        return list;
      }

      const pushTestcasetList = (list: any) => {
        for (let i in list) {
          for (let k in list[i]["testcase"]) {
            array2.push({
              _id: list[i]["testcase"][k]["_id"],
              name: list[i]["testcase"][k]["testcaseName"],
              description: list[i]["testcase"][k]["description"],
              testsuite: list[i]["testsuitename"],
              type: list[i]["testcase"][k]["type"],
              priority: list[i]["testcase"][k]["priority"],
              is_assigned: list[i]["testcase"][k]["is_assigned"],
              precondition: list[i]["testcase"][k]["precondition"],
              postcondition: list[i]["testcase"][k]["postcondition"],
              testexecution: list[i]["testcase"][k]["testexecution"],
              listStep: list[i]["testcase"][k]["listStep"],
              children: []
            });
          }
        }
        return list;
      }


      const buildTree1 = (nodes: any) => {
        for (let i = 0; i < nodes.length; i++) {
          for (let j = 0; j < nodes[i].children.length; j++) {
            let node = nodes[i].children[j];
            let found = nodes.find((n: any) => n._id == node);
            if (found) {
              nodes[i].children[j] = Object.assign({}, found);
              found.removed = true;
            } else {
              nodes[i].children[j] = {
                _id: node,
                children: []
              };
            }
          }
        }

        return nodes.reduce((arr: any, item: any) => {
          if (!item.removed) {
            arr.push(item);
          }
          return arr;
        }, []);
      }

      let data = convertList(list);
      let data2 = pushTestcasetList(list);
      const array3 = JSON.parse(JSON.stringify(array2));
      const result1 = buildTree1(array3);
      //console.log(JSON.stringify(result1, null, '  '));
      for (let i in result1) {
        array.children.push(result1[i]);
      }
      //console.log('array: '+JSON.stringify(array, null, '  '));
      //console.log('data: '+JSON.stringify(array2, null, '  '));

      res.status(200).json({ status: 200, success: true, result: array, errMsg: '' });
    } catch (error) {
      //res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
      next(error);
    }
  };

  public SearchTestcaseInTestExecution = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const model: SearchTestcaseDto = req.body;
      const resultObj =
        await this.testcaseService.searchTestcaseOfProject(req.params.project_id, model);
      const resultObj3: any = resultObj.testsuites;
      //console.log(resultObj3);

      let array: any = {
        value: resultObj3["_id"],
        label: resultObj3.projectname,
        description: resultObj3.description,
        type: 'root',
        total_testcase: resultObj.totalTCOfProject,
        numberof_testcaseuntest: resultObj.totalTNUntestOfProject,
        total_testsuite_child: resultObj.totalTestsuiteOfProject,
        children: [
          {
            value: { type: String },
            children: [],
            label: { type: String },
            description: { type: String },
            type: { type: String },
            priority: { type: String },
            is_assigned: { type: String },
            total_testcase: { type: Number },
            numberof_testcaseuntest: { type: Number },
            total_testsuite_child: {type: Number},
            parent: { type: String }
          }
        ]
      }
      array.children.pop();

      let list: any = resultObj3["testsuite"];

      let array2: any = [{
        value: { type: String },
        children: [],
        label: { type: String },
        description: { type: String },
        type: { type: String },
        priority: { type: String },
        is_assigned: { type: String },
        total_testcase: { type: Number },
        numberof_testcaseuntest: { type: Number },
        total_testsuite_child: {type: Number},
        parent: { type: String }
      }]
      array2.pop();
      //let array2 = JSON.parse(JSON.stringify(array1));

      const convertList = (list: any) => {
        for (let i in list) {
          array2.push({
            value: list[i]["_id"],
            label: list[i]["testsuitename"],
            description: list[i]["description"],
            type: list[i]["type"],
            priority: list[i]["priority"],
            is_assigned: list[i]["is_assigned"],
            total_testcase: list[i]["total_testcase"],
            numberof_testcaseuntest: list[i]["numberof_testcaseuntest"],
            total_testsuite_child: list[i]["testsuite_child"].length,
            parent: list[i]["testsuite_parent"],
            children: []
          });
          for (let j in list[i]["testsuite_child"]) {
            array2[i].children.push(list[i]["testsuite_child"][j]);
          }
          for (let k in list[i]["testcase"]) {
            array2[i].children.push(list[i]["testcase"][k]["_id"]);
          }

        }
        return list;
      }

      const pushTestcasetList = (list: any) => {
        for (let i in list) {
          for (let k in list[i]["testcase"]) {
            array2.push({
              value: list[i]["testcase"][k]["_id"],
              label: list[i]["testcase"][k]["testcaseName"],
              description: list[i]["testcase"][k]["description"],
              testsuite: list[i]["testsuitename"],
              type: list[i]["testcase"][k]["type"],
              priority: list[i]["testcase"][k]["priority"],
              is_assigned: list[i]["testcase"][k]["is_assigned"],
              precondition: list[i]["testcase"][k]["precondition"],
              postcondition: list[i]["testcase"][k]["postcondition"],
              testexecution: list[i]["testcase"][k]["testexecution"],
              listStep: list[i]["testcase"][k]["listStep"],
              children: []
            });
          }
        }
        return list;
      }


      const buildTree1 = (nodes: any) => {
        for (let i = 0; i < nodes.length; i++) {
          for (let j = 0; j < nodes[i].children.length; j++) {
            let node = nodes[i].children[j];
            let found = nodes.find((n: any) => n.value == node);
            if (found) {
              nodes[i].children[j] = Object.assign({}, found);
              found.removed = true;
              if (nodes[i].children[j].children[0] === '' || nodes[i].children[j].children[0] === undefined) {
                delete nodes[i].children[j].children;
              }
            } else {
              nodes[i].children[j] = {
                value: node,
                //children: []
              };
            }
          }
        }

        return nodes.reduce((arr: any, item: any) => {
          if (item.children[0] === '' || item.children[0] === undefined)
            delete item.children;

          if (!item.removed) {
            arr.push(item);
          }
          return arr;
        }, []);
      }

      let data = convertList(list);
      let data2 = pushTestcasetList(list);
      const array3 = JSON.parse(JSON.stringify(array2));
      const result1 = buildTree1(array3);
      for (let i in result1) {
        array.children.push(result1[i]);
      }

      res.status(200).json({ status: 200, success: true, result: array, errMsg: '' });
    } catch (error) {
      //res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
      next(error);
    }
  };

  public TestElasticSearch = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const model: CreateTestCaseDto = req.body;
      const projectId = req.params.project_id;
      const result = await this.testcaseService.readFileExcel();
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

}