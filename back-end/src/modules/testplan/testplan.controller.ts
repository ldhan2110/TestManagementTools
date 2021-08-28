import CreateTestPlanDto from "./dtos/create_testplan.dto";
import TestPlanService from "./testplan.services";
import { NextFunction, Request, Response } from 'express';
import { ITestPlan } from "@modules/testplan";


export default class TestPlanController {
    private testplanService = new TestPlanService();

      public CreateTestPlanAndAddProject = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const projectId = req.params.project_id;
          const model: CreateTestPlanDto = req.body;
          const project = await this.testplanService.createTestPlanAndAddProject(model, projectId);
          res.status(200).json({status: 200, success: true, result:project, errMsg:''});
        } catch (error) {
          //res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
          next(error);
        }
      };  

      public GetAllTestPlanOfProject = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const resultObj: Partial<ITestPlan>[] = 
          await this.testplanService.getAllTestPlanOfProject(req.params.project_id);

          //convert date
          const result:any = resultObj;
          let listTestplan:any =[{
            is_active: {type: String},
            is_public: {type: String},
            _id: {type: String},
            testplanname: {type: String},
            description: {type: String},
            created_date:{type: String}
            }] ; listTestplan.pop();
          
          for(let i in result){
            var day = result[i]["created_date"].getDate();
            if(day<10){
              day = '0'+day;
            }
            var month = result[i]["created_date"].getMonth()+1;
            if(month<10){
              month = '0'+month;
            }
            var year = result[i]["created_date"].getFullYear();
            console.log('day: '+ day);
            listTestplan.push({
              is_active: result[i]["is_active"],
              is_public: result[i]["is_public"],
              _id: result[i]["_id"],
              testplanname: result[i]["testplanname"],
              created_date: day+'-'+month+'-'+year,
              description: result[i]["description"],
            })
          }
          //console.log('listTestplan: '+JSON.stringify(listTestplan, null, ' '));
          res.status(200).json({status: 200, success: true, result:listTestplan, errMsg:''});
        } catch (error) {
          //res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
          next(error);
        }
      };

      public GetAllTestPlanOfProjectActive = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const resultObj: Partial<ITestPlan>[] = await this.testplanService.getAllTestPlanOfProjectActive(req.params.project_id);
          //res.status(200).json(resultObj);
          res.status(200).json({status: 200, success: true, result:resultObj, errMsg:''});
        } catch (error) {
          //res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
          next(error);
        }
      };

      public GetAllBuildOfTestplan = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const resultObj: Partial<ITestPlan>[] = await this.testplanService.getAllBuildOfTestplan(req.params.project_id, req.body.testplanname);
          //res.status(200).json(resultObj);
          res.status(200).json({status: 200, success: true, result:resultObj, errMsg:''});
        } catch (error) {
          //res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
          next(error);
        }
      };

      public SearchTestPlanOfProject = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          //console.log('keyword: '+req.body.keyword);
          const resultObj: Partial<ITestPlan>[] = 
          await this.testplanService.searchTestPlanOfProject(req.params.project_id, req.body.keyword);
          //res.status(200).json(resultObj);
          res.status(200).json({status: 200, success: true, result:resultObj, errMsg:''});
        } catch (error) {
          //res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
          next(error);
        }
      };

      public UpdateTestPlan = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const model: CreateTestPlanDto = req.body;
          const testplanId = req.params.testplan_id;
          const projectid = req.params.project_id;
          const result = await this.testplanService.updateTestPlan(model, testplanId, projectid);
          //res.status(200).json(result);
          res.status(200).json({status: 200, success: true, result:result, errMsg:''});
        } catch (error) {
          //res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
          next(error);
        }
      };
    
      public RemoveAndDeleteTestPlan = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const projectId = req.params.project_id;
          const testplanId = req.params.testplan_id;
          const project = await this.testplanService.removeAndDeleteTestPlan(projectId, testplanId);
          //res.status(200).json(project);
          res.status(200).json({status: 200, success: true, result:project, errMsg:''});
        } catch (error) {
          //res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
          next(error);
        }
      };

      public DisableTestPlan = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const projectId = req.params.project_id;
          const testplanId = req.params.testplan_id;
          const project = await this.testplanService.disableTestPlan(testplanId, projectId);
          //res.status(200).json(project);
          res.status(200).json({status: 200, success: true, result:project, errMsg:''});
        } catch (error) {
          //res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
          next(error);
        }
      };

      public DuplicateTestPlan = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const projectId = req.params.project_id;
          const testplanId = req.params.testplan_id;
          const result = await this.testplanService.duplicateTestPlan(testplanId, projectId);
          //res.status(200).json(project);
          res.status(200).json({status: 200, success: true, result:result, errMsg:''});
        } catch (error) {
          //res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
          next(error);
        }
      };
    
}