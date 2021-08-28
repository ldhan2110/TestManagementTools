import ProjectRequirementService from "./projectrequirement.services";
import { NextFunction, Request, Response } from 'express';
import CreateProjectRequirementDto from "./dtos/create_projectrequirement.dto";
import { IProjectRequirement } from ".";



export default class ProjectRequirementController {
    private projectrequirementService = new ProjectRequirementService();

    public CreateProjectRequirementAndAddProject = async (
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      try {
        const projectId = req.params.project_id;
        const model: CreateProjectRequirementDto = req.body;
        const project = await this.projectrequirementService.createProjectRequirementAndAddProject(model, projectId);
        res.status(200).json({status: 200, success: true, result:"success", errMsg:''});
      } catch (error) {
        next(error);
      }
    };  

    public GetAllProjectRequirementOfProject = async (
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      try {
        const resultObj: Partial<IProjectRequirement>[] = 
        await this.projectrequirementService.getAllProjectRequirementOfProject(req.params.project_id);

        //convert date
        const result:any = resultObj;
        let listProjectRequirement:any =[{
          is_active: {type: String},
          is_public: {type: String},
          status: {type: String},
          _id: {type: String},
          projectrequirementname: {type: String},
          description: {type: String},
          testexecution:[],
          created_date:{type: String}
          }] ; listProjectRequirement.pop();
        
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
          //console.log('day: '+ day);
          listProjectRequirement.push({
            is_active: result[i]["is_active"],
            is_public: result[i]["is_public"],
            status: result[i]["status"],
            _id: result[i]["_id"],
            projectrequirementname: result[i]["projectrequirementname"],
            created_date: day+'-'+month+'-'+year,
            testexecution: result[i]["testexecution"],
            description: result[i]["description"],
          })
        }
        res.status(200).json({status: 200, success: true, result:listProjectRequirement, errMsg:''});
      } catch (error) {
        next(error);
      }
    };

    public GetAllProjectRequirementOfProjectActive = async (
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      try {
        const resultObj: Partial<IProjectRequirement>[] = await this.projectrequirementService.getAllProjectRequirementOfProjectActive(req.params.project_id);
        //res.status(200).json(resultObj);
        res.status(200).json({status: 200, success: true, result:resultObj, errMsg:''});
      } catch (error) {
        //res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
        next(error);
      }
    };

    /*public GetAllBuildOfProjectRequirement = async (
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      try {
        const resultObj: Partial<IProjectRequirement>[] = await this.projectrequirementService.getAllBuildOfProjectRequirement(req.params.project_id, req.body.projectrequirementname);
        //res.status(200).json(resultObj);
        res.status(200).json({status: 200, success: true, result:resultObj, errMsg:''});
      } catch (error) {
        //res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
        next(error);
      }
    };*/

    public SearchProjectRequirementOfProject = async (
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      try {
        //console.log('keyword: '+req.body.keyword);
        const resultObj: Partial<IProjectRequirement>[] = 
        await this.projectrequirementService.searchProjectRequirementOfProject(req.params.project_id, req.body.keyword);
        //res.status(200).json(resultObj);
        res.status(200).json({status: 200, success: true, result:resultObj, errMsg:''});
      } catch (error) {
        //res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
        next(error);
      }
    };

    public UpdateProjectRequirement = async (
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      try {
        const model: CreateProjectRequirementDto = req.body;
        const projectrequirementId = req.params.projectrequirement_id;
        const projectid = req.params.project_id;
        const result = await this.projectrequirementService.updateProjectRequirement(model, projectrequirementId, projectid);
        //res.status(200).json(result);
        res.status(200).json({status: 200, success: true, result:result, errMsg:''});
      } catch (error) {
        //res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
        next(error);
      }
    };
  
    public RemoveAndDeleteProjectRequirement = async (
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      try {
        const projectId = req.params.project_id;
        const projectrequirementId = req.params.projectrequirement_id;
        const project = await this.projectrequirementService.removeAndDeleteProjectRequirement(projectId, projectrequirementId);
        //res.status(200).json(project);
        res.status(200).json({status: 200, success: true, result:project, errMsg:''});
      } catch (error) {
        //res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
        next(error);
      }
    };

    public DisableProjectRequirement = async (
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      try {
        const projectId = req.params.project_id;
        const projectrequirementId = req.params.projectrequirement_id;
        const project = await this.projectrequirementService.disableProjectRequirement(projectrequirementId, projectId);
        //res.status(200).json(project);
        res.status(200).json({status: 200, success: true, result:project, errMsg:''});
      } catch (error) {
        //res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
        next(error);
      }
    };

    /*public DuplicateProjectRequirement = async (
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      try {
        const projectId = req.params.project_id;
        const projectrequirementId = req.params.projectrequirement_id;
        const result = await this.projectrequirementService.duplicateProjectRequirement(projectrequirementId, projectId);
        //res.status(200).json(project);
        res.status(200).json({status: 200, success: true, result:result, errMsg:''});
      } catch (error) {
        //res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
        next(error);
      }
    };*/
    
  }