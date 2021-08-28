import BuildService from "./build.services";
import { NextFunction, Request, Response } from 'express';
import CreateBuildDto from "./dtos/create_build.dto";
import { IBuild } from "./build.interface";

export default class BuildController {
    private buildService = new BuildService();

    public CreateBuildAndAddProject = async (
      req: Request,
      res: Response,
      next: NextFunction
      ) => {
      try {
        const projectId = req.params.project_id;
        const model: CreateBuildDto = req.body;
        if(model.id_exist_build !== undefined && model.id_exist_build !== "" && model.id_exist_build !== null){
          const build = await this.buildService.duplicateBuild(model, projectId);
        }
        else{
          const build = await this.buildService.createBuildAndAddProject(model, projectId);
        }
        //res.status(200).json(project);
        res.status(200).json({status: 200, success: true, result:"success", errMsg:''});
      } catch (error) {
        next(error);
      }
      };
    
      public AddBuildForTestPlan = async (
      req: Request,
      res: Response,
      next: NextFunction
      ) => {
      try {
        const testplanId = req.params.testplan_id;
        const buildId = req.params.build_id;
        const testplan = await this.buildService.addBuildForTestPlan(testplanId, buildId);
        //res.status(200).json(testplan);
        res.status(200).json({status: 200, success: true, result:testplan, errMsg:''});
      } catch (error) {
        res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
        next(error);
      }
      };

      public CreateBuildAndAddTestPlan = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const projectId = req.params.project_id;
          const testplanId = req.params.testplan_Id;
          const model: CreateBuildDto = req.body;
          const project = await this.buildService.createBuildAndAddTestPlan(model, projectId, testplanId);
          //res.status(200).json(project);
          res.status(200).json({status: 200, success: true, result:project, errMsg:''});
        } catch (error) {
          res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
          next(error);
        }
      };

      public GetAllBuildOfProject = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const resultObj = 
          await this.buildService.getAllBuildOfProject(req.params.project_id);
          const result:any = resultObj.pop();
          const result2:any = result.build;
          //console.log('result: '+JSON.stringify(result, null, ' '));
          //res.status(200).json(resultObj);
          let listBuild:any ={
            build:[{
              _id: {type: String},
              buildname: {type: String},
              description: {type: String},
              is_active: {type: String},
              is_open: {type: String},
              releasedate: {type: String},
              testplan: {
                testplanname:{type: String}
              },
              //_id: {type: String},
            }],
            _id: {type:String}
          } ; listBuild.build.pop();

          listBuild._id = result._id;
          for(let i in result2){
            var day = result2[i]["releasedate"].getDate();
            if(day<10){
              day = '0'+day;
            }
            var month = result2[i]["releasedate"].getMonth()+1;
            if(month<10){
              month = '0'+month;
            }
            var year = result2[i]["releasedate"].getFullYear();
            //console.log('day: '+ day);
            listBuild.build.push({
              buildname: result2[i]["buildname"],
              description: result2[i]["description"],
              is_active: result2[i]["is_active"],
              is_open: result2[i]["is_open"],
              releasedate: day+'-'+month+'-'+year,
              testplan: result2[i]["testplan"],
              _id: result2[i]["_id"],
            })
          }
          //console.log('listBuild: '+JSON.stringify(listBuild, null, ' '));
          resultObj.push(listBuild);

          res.status(200).json({status: 200, success: true, result:resultObj, errMsg:''});
        } catch (error) {
          //res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
          next(error);
        }
      };

      public SearchBuildOfProject = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const resultObj = 
          await this.buildService.searchBuildOfProject(req.params.project_id, req.body.keyword);
          //res.status(200).json(resultObj);
          res.status(200).json({status: 200, success: true, result:resultObj, errMsg:''});
        } catch (error) {
          //res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
          next(error);
        }
      };

      public GetAllBuildOfProjectActive = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const resultObj = 
          await this.buildService.getAllBuildOfProjectActive(req.params.project_id);
          //res.status(200).json(resultObj);
          res.status(200).json({status: 200, success: true, result:resultObj, errMsg:''});
        } catch (error) {
          //res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
          next(error);
        }
      };

      public GetAllBuildOfTestplantActive = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const resultObj = 
          await this.buildService.getAllBuildOfTestPlanActive(req.params.project_id, req.params.testplan_id);
          //res.status(200).json(resultObj);
          res.status(200).json({status: 200, success: true, result:resultObj, errMsg:''});
        } catch (error) {
          //res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
          next(error);
        }
      };
      
      public GetAllBuildOfTestPlan = async (
        req: Request,
        res: Response,
        next: NextFunction
        ) => {
        try {
          const resultObj: Partial<IBuild>[] = 
          await this.buildService.getAllBuildOfTestPlan(req.params.testplan_id);
          //res.status(200).json(resultObj);
          res.status(200).json({status: 200, success: true, result:resultObj, errMsg:''});
        } catch (error) {
          res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
          next(error);
        }
      };

      public GetBuildById = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          console.log('hello');
          const user = await this.buildService.getBuildById(req.params.build_id);
          //res.status(200).json(user);
          res.status(200).json({status: 200, success: true, result:user, errMsg:''});
        } catch (error) {
          res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
          next(error);
        }
      };

      public UpdateBuild = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const model: CreateBuildDto = req.body;
          const buildId = req.params.build_id;
          const projectId = req.params.project_id;
          const result = await this.buildService.updateBuild(model, buildId, projectId);
          res.status(200).json({status: 200, success: true, result:result, errMsg:''});
        } catch (error) {
          next(error);
        }
      };

      public RemoveBuildFromTestPlan = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
            const testplanId = req.params.testplan_id;
            const buildId = req.params.build_id;
          const build = await this.buildService.removeBuildFromTestPlan(testplanId, buildId);
          //res.status(200).json(group);
          res.status(200).json({status: 200, success: true, result:build, errMsg:''});

        } catch (error) {
          res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
          next(error);
        }
      };
    
      public RemoveAndDeleteBuildFromProject = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const projectId = req.params.project_id;
          const buildId = req.params.build_id;
          const group = await this.buildService.removeAndDeleteBuildFromProject(projectId, buildId);
          //res.status(200).json(group);
          res.status(200).json({status: 200, success: true, result:group, errMsg:''});
        } catch (error) {
          //res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
          next(error);
        }
      };

      public DisableBuildFromProject = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const projectId = req.params.project_id;
          const buildId = req.params.build_id;
          const group = await this.buildService.disableBuildFromProject(projectId, buildId);
          //res.status(200).json(group);
          res.status(200).json({status: 200, success: true, result:group, errMsg:''});
        } catch (error) {
          //res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
          next(error);
        }
      };

      public RemoveAndDeleteBuildFromTestPlan = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const projectId = req.params.project_id;
          const testplanId = req.params.testplan_id;
          const buildId = req.params.build_id;
          const group = await this.buildService.removeAndDeleteBuildFromTestPlan(projectId, testplanId, buildId);
          //res.status(200).json(group);
          res.status(200).json({status: 200, success: true, result:group, errMsg:''});
        } catch (error) {
          res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
          next(error);
        }
      };

      public DuplicateBuild = async (
        req: Request,
        res: Response,
        next: NextFunction
        ) => {
        try {
          const projectId = req.params.project_id;
          const model: CreateBuildDto = req.body;
          const build = await this.buildService.duplicateBuild(model, projectId);
          //res.status(200).json(project);
          res.status(200).json({status: 200, success: true, result:build, errMsg:''});
        } catch (error) {
          //res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
          next(error);
        }
        };
    
  }