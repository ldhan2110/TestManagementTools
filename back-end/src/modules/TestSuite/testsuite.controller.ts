import { NextFunction, Request, Response } from 'express';
import { ITestSuite } from "./testsuite.interface";
import CreateTestSuiteDto from "./dtos/create_testsuite.dto";
import TestSuiteService from './testsuite.services';
import { json } from 'envalid';
var elasticsearch = require('elasticsearch');
var client        = new elasticsearch.Client({
                            host: 'https://frko2fg30c:qgpsq7466h@ash-452073280.us-east-1.bonsaisearch.net:443'
                        });
export default class TestSuiteController {
    private testsuiteService = new TestSuiteService();

    public CreateTestSuiteAndAddProject = async (
      req: Request,
      res: Response,
      next: NextFunction
      ) => {
      try {
        const projectId = req.params.project_id;
        const model: CreateTestSuiteDto = req.body;
        const project = await this.testsuiteService.createTestSuiteAndAddProject(model, projectId);
        //res.status(200).json('project');
        res.status(200).json({status: 200, success: true, result:"success", errMsg:''});
      } catch (error) {
        //res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
        next(error);
      }
      };
    
      public AddTestSuiteForTestPlan = async (
      req: Request,
      res: Response,
      next: NextFunction
      ) => {
      try {
        const testplanId = req.params.testplan_id;
        const testsuiteId = req.params.testsuite_id;
        const testplan = await this.testsuiteService.addTestSuiteForTestPlan(testplanId, testsuiteId);
        //res.status(200).json(testplan);
        res.status(200).json({status: 200, success: true, result:testplan, errMsg:''});
      } catch (error) {
        res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
        next(error);
      }
      };

      public AddTestSuiteForTestSuite = async (
        req: Request,
        res: Response,
        next: NextFunction
        ) => {
        try {
          const testsuitedestinationId = req.params.testsuitedestination_id;
          const testsuiteId = req.params.testsuite_id;
          const testsuitedestination = await this.testsuiteService.addTestSuiteForTestSuite(testsuitedestinationId, testsuiteId);
          //res.status(200).json(testplan);
          res.status(200).json({status: 200, success: true, result:testsuitedestination, errMsg:''});
        } catch (error) {
          res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
          next(error);
        }
        };

      public CreateTestSuiteAndAddTestPlan = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const projectId = req.params.project_id;
          const testplanId = req.params.testplan_Id;
          const model: CreateTestSuiteDto = req.body;
          const project = await this.testsuiteService.createTestSuiteAndAddTestPlan(model, projectId, testplanId);
          //res.status(200).json(project);
          res.status(200).json({status: 200, success: true, result:project, errMsg:''});
        } catch (error) {
          //res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
          next(error);
        }
      };

      public GetAllTestSuiteOfProject = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const resultObj = 
          await this.testsuiteService.getAllTestSuiteOfProject(req.params.project_id);
          const resultObj3:any = resultObj.testsuites;
          
          let array:any = {
            _id: resultObj3["_id"],
            name: resultObj3.projectname,
            description: resultObj3.description,
            type: 'root',
            total_testcase: resultObj.totalTCOfProject,
            numberof_testcaseuntest: resultObj.totalTNUntestOfProject,
            total_testsuite_child: resultObj.totalTestsuiteOfProject,
            children:[
             {
              _id: {type:String},
              children: [],
              name: {type:String},
              description: {type:String},
              type: {type:String},
              priority : {type: String} ,
              is_assigned: {type: String},
              total_testcase: {type: Number},
              numberof_testcaseuntest: {type: Number},
              total_testsuite_child: {type: Number},
              parent: {type: String}
             }
            ]
          }    
          array.children.pop();

          let list:any = resultObj3["testsuite"];

          let array2:any = [{
            _id: {type:String},
            children: [],
            name: {type:String},
            description: {type:String},
            type: {type:String},
            priority : {type: String} ,
            is_assigned: {type: String},
            total_testcase: {type: Number},
            numberof_testcaseuntest: {type: Number},
            total_testsuite_child: {type: Number},
            parent: {type: String}  
          }]
          array2.pop();
          //let array2 = JSON.parse(JSON.stringify(array1));
          
          const convertList = (list:any) =>{
            for(let i in list){
              array2.push({
                _id: list[i]["_id"],
                name: list[i]["testsuitename"],
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
              for(let j in list[i]["testsuite_child"]){
                array2[i].children.push(list[i]["testsuite_child"][j]);
              }
              for(let k in list[i]["testcase"]){        
                array2[i].children.push(list[i]["testcase"][k]["_id"]);
              }
              
            }
            return list;
          }
          
          const pushTestcasetList = (list:any) =>{
            for(let i in list){
              for(let k in list[i]["testcase"]){
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
          
        
            const buildTree1 = (nodes:any) => {
              for (let i = 0; i < nodes.length; i++) {
                for (let j = 0; j < nodes[i].children.length; j++) {
                  let node = nodes[i].children[j];
                  let found = nodes.find((n:any) => n._id == node);
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
            
              return nodes.reduce((arr:any, item:any) => {
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
          for(let i in result1){
            array.children.push(result1[i]);
          }

          client.index({  
            index: 'alltestcase',
            body: array
          });
          
          res.status(200).json({status: 200, success: true, result:array, errMsg:''});
        } catch (error) {
          //res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
          next(error);
        }
      };

      public GetAllTestSuiteOfProjectNoTree = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const resultObj = 
          await this.testsuiteService.getAllTestSuiteOfProject(req.params.project_id);
          //console.log('resultObj: '+JSON.stringify(resultObj, null, ' '));
          const resultObj3:any = resultObj.testsuites;
          //console.log('resultObj3: '+JSON.stringify(resultObj3, null, ' '));
          
          let array:any = {
            value: resultObj3["_id"],
            label: resultObj3.projectname,
            description: resultObj3.description,
            type: 'root',
            total_testcase: resultObj.totalTCOfProject,
            numberof_testcaseuntest: resultObj.totalTNUntestOfProject,
            total_testsuite_child: resultObj.totalTestsuiteOfProject,
            children:[
             {
              value: {type:String},
              children: [],
              label: {type:String},
              description: {type:String},
              type: {type:String},
              priority : {type: String} ,
              is_assigned: {type: String},
              total_testcase: {type: Number},
              numberof_testcaseuntest: {type: Number},
              total_testsuite_child: {type: Number},
              parent: {type: String}
             }
            ]
          }    
          array.children.pop();

          let list:any = resultObj3["testsuite"]; 

          let array2:any = [{
            value: {type:String},
            children: [],
            label: {type:String},
            description: {type:String},
            type: {type:String},
            priority : {type: String} ,
            is_assigned: {type: String},
            total_testcase: {type: Number},
            numberof_testcaseuntest: {type: Number},
            total_testsuite_child: {type: Number},
            parent: {type: String}  
          }]
          array2.pop();
          
          const convertList = (list:any) =>{
            for(let i in list){
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
                for(let j in list[i]["testsuite_child"]){
                  if(list[i]["testsuite_child"][0] === undefined){

                  }
                  else
                    array2[i].children.push(list[i]["testsuite_child"][j]);
                }
                for(let k in list[i]["testcase"]){        
                  array2[i].children.push(list[i]["testcase"][k]["_id"]);
                }
              //} 
            }
            return list;
          }
          
          const pushTestcasetList = (list:any) =>{
            for(let i in list){
              for(let k in list[i]["testcase"]){
                array2.push({
                  value: list[i]["testcase"][k]["_id"],
                  label: list[i]["testcase"][k]["testcaseName"],
                  description: list[i]["testcase"][k]["description"],
                  type: list[i]["testcase"][k]["type"],
                  priority: list[i]["testcase"][k]["priority"],
                  is_assigned: list[i]["testcase"][k]["is_assigned"],
                  precondition: list[i]["testcase"][k]["precondition"],
                  postcondition: list[i]["testcase"][k]["postcondition"],
                  listStep: list[i]["testcase"][k]["listStep"],
                  children: []
                });     
              }
            }
            return list;
          }
          
        
            const buildTree1 = (nodes:any) => {
              for (let i = 0; i < nodes.length; i++) {
                  for (let j = 0; j < nodes[i].children.length; j++) {
                    let node = nodes[i].children[j];
                    let found = nodes.find((n:any) => n.value == node);
                    if (found) {
                      nodes[i].children[j] = Object.assign({}, found);
                      found.removed = true;
                      if(nodes[i].children[j].children[0]=== '' || nodes[i].children[j].children[0]===undefined){
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
            
              return nodes.reduce((arr:any, item:any) => {
                if(item.children[0] === '' || item.children[0] === undefined)
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
          for(let i in result1){
            array.children.push(result1[i]);
          }
       
          res.status(200).json({status: 200, success: true, result:array, errMsg:''});
        } catch (error) {
          //res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
          next(error);
        }
      };

      public GetAllTestSuiteOfProjectOnlyName = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const resultObj: Partial<ITestSuite>[] = 
          await this.testsuiteService.getAllTestSuiteOfProjectOnlyName(req.params.project_id);
          const resultObj3:any = resultObj.pop();
          
          let array:any = {
            _id: resultObj3["_id"],
            name: resultObj3.projectname,
            description: resultObj3.description,
            type: 'root',
            children:[
             {
              name: {type:String},
             }
            ]
          }    
          array.children.pop();

          let data2 = resultObj3["testsuite"];
          let smallObj = [];
          for (let i in data2) {
            array.children.push({
              name: data2[i]["testsuitename"],
              _id: data2[i]["_id"]
            });
            }  
          
          
          res.status(200).json({status: 200, success: true, result:array, errMsg:''});
        } catch (error) {
          //res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
          next(error);
        }
      };
      
      public GetAllTestSuiteOfTestPlan = async (
        req: Request,
        res: Response,
        next: NextFunction
        ) => {
        try {
          const resultObj: Partial<ITestSuite>[] = 
          await this.testsuiteService.getAllTestSuiteOfTestPlan(req.params.testplan_id);
          //res.status(200).json(resultObj);
          res.status(200).json({status: 200, success: true, result:resultObj, errMsg:''});
        } catch (error) {
          res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
          next(error);
        }
      };

      public GetTestSuiteById = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const user = await this.testsuiteService.getTestSuiteById(req.params.testsuite_id);
          //res.status(200).json(user);
          res.status(200).json({status: 200, success: true, result:user, errMsg:''});
        } catch (error) {
          res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
          next(error);
        }
      };

      public UpdateTestSuite = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const model: CreateTestSuiteDto = req.body;
          const testsuiteId = req.params.testsuite_id;
          const projectId = req.params.project_id;
          const result = await this.testsuiteService.updateTestSuite(model, testsuiteId, projectId);
          //res.status(200).json(result);
          res.status(200).json({status: 200, success: true, result:result, errMsg:''});
        } catch (error) {
          //res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
          next(error);
        }
      };

      public RemoveTestSuiteFromTestPlan = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
            const testplanId = req.params.testplan_id;
            const testsuiteId = req.params.testsuite_id;
          const testsuite = await this.testsuiteService.removeTestSuiteFromTestPlan(testplanId, testsuiteId);
          //res.status(200).json(group);
          res.status(200).json({status: 200, success: true, result:testsuite, errMsg:''});

        } catch (error) {
          res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
          next(error);
        }
      };
    
      public RemoveAndDeleteTestSuiteFromProject = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const projectId = req.params.project_id;
          const testsuiteId = req.params.testsuite_id;
          const group = await this.testsuiteService.removeAndDeleteTestSuiteFromProject(projectId, testsuiteId);
          //res.status(200).json(group);
          res.status(200).json({status: 200, success: true, result:group, errMsg:''});
        } catch (error) {
          res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
          next(error);
        }
      };

      public RemoveAndDeleteTestSuiteFromTestPlan = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const projectId = req.params.project_id;
          const testplanId = req.params.testplan_id;
          const testsuiteId = req.params.testsuite_id;
          const group = await this.testsuiteService.removeAndDeleteTestSuiteFromTestPlan(projectId, testplanId, testsuiteId);
          //res.status(200).json(group);
          res.status(200).json({status: 200, success: true, result:group, errMsg:''});
        } catch (error) {
          res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
          next(error);
        }
      };
    
  }