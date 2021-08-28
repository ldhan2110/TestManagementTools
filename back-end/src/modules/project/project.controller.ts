import ProjectService from "./project.services";
import { NextFunction, Request, Response } from 'express';
import CreateProjectDto from "./dtos/create_project.dto";
import SetMemberDto from "./dtos/set_member.dto";
import InforProjectDto from "./dtos/infor_project.dto";
import IProject from "./project.interface";
import UpdateProjectDto from "./dtos/update_project.dto";
import { UserSchema } from "@modules/users";
import { HttpException } from "@core/exceptions";
import ChangeRoleMemberDto from "./dtos/change_role.dto";

export default class ProjectController {
    private projectService = new ProjectService();
  
      public CreateProject = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const model: CreateProjectDto = req.body;
          const result = await this.projectService.createProject(req.user.id, model);
          //res.status(201).json(result);
          res.status(201).json({status: 201, success: true, result:"success", errMsg:''});
        } catch (error) {
          res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
          next(error);
        }
      };

      public GetAllMembers = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const projectId = req.params.project_id;
          const members = await this.projectService.getAllMembers(projectId);
          //res.status(200).json(members);
          res.status(200).json({status: 200, success: true, result:members, errMsg:''});
        } catch (error) {
          res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
          next(error);
        }
      };

      public GetAllProject = async (req: Request, res: Response, next: NextFunction) => {
        try {
          const projects = await this.projectService.getAllProject();
          //res.status(200).json(projects);
          res.status(200).json({status: 200, success: true, result:projects, errMsg:''});
        } catch (error) {
          res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
          next(error);
        }
      };

      public GetAllProjectByCreatedUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
          const model: CreateProjectDto = req.body;
          const projects = await this.projectService.getAllProjectByCreatedUser(req.user.id);
          res.status(200).json({status: 200, success: true, result:projects, errMsg:''});
        } catch (error) {
          //res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
          next(error);
        }
      };

      public GetRoleUserJoin = async (req: Request, res: Response, next: NextFunction) => {
        try {
          const projects = await this.projectService.getRoleUserJoin(req.user.id);
          //res.status(200).json(users);
          //console.log('result: '+JSON.stringify(projects, null, ' '));
          const user = await UserSchema.findById(req.user.id, 'inproject').exec();
          if (!user) throw new HttpException(400, 'User id is not exist');
          
          let results:any = [
            {
              _id:{type: String},
              projectname:{type: String},
              description:{type: String},
              status:{type: String},
              role:{type: String},
            }
          ]; results.pop();
      
          results = user.inproject.filter(project => 2>0)

          //console.log(JSON.stringify(results, null, ' '));

          let results2:any = [
            {
              _id:{type: String},
              projectname:{type: String},
              description:{type: String},
              status:{type: String},
              role:{type: String},
            }
          ]; results2.pop();
          for(let i in projects){
            results2.push({
              _id: projects[i]["_id"],
              projectname: projects[i]["projectname"],
              description: projects[i]["description"],
              status: projects[i]["status"],
              role: "tester"
            })
          }
          //results2 = projects
      
          for(let i in results2){
            for(let j in results){
              if(results2[i]["_id"].toString() == results[j]["_id"].toString()){
                //result.projectname = project.projectname,
                //result.description = project.description,
                //result.status = project.status
                //result.status = 'sss'
                results2[i]["role"] = results[j]["role"];
                //console.log('hereeeeeeeee');
              }
            }
          }

          res.status(200).json({status: 200, success: true, result:results2, errMsg:''});
        } catch (error) {
          //res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
          next(error);
        }
      };

      public GetAllProjectByUserJoin = async (req: Request, res: Response, next: NextFunction) => {
        try {
          const model: CreateProjectDto = req.body;
          const projects = await this.projectService.getAllProjectByUserJoin(req.user.id);
          res.status(200).json({status: 200, success: true, result:projects, errMsg:''});
        } catch (error) {
          //res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
          next(error);
        }
      };

      public GetProjectById = async (req: Request, res: Response, next: NextFunction) => {
        try {
          const project = await this.projectService.getProjectById(req.params.project_id);
          res.status(200).json({status: 200, success: true, result:project, errMsg:''});
        } catch (error) {
          //res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
          next(error);
        }
      };
    
      public UpdateProject = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const model: UpdateProjectDto = req.body;
          const projectId = req.params.project_id;
          const result = await this.projectService.updateProject(projectId, model, req.user.id);
          //res.status(200).json(result);
          res.status(200).json({status: 200, success: true, result:result, errMsg:''});
        } catch (error) {
          //res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
          next(error);
        }
      };

      public ChangeRoleMember = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const model: ChangeRoleMemberDto = req.body;
          const projectId = req.params.project_id;
          const result = await this.projectService.changeRoleMember(model, projectId, req.user.id);
          //res.status(200).json(result);
          res.status(200).json({status: 200, success: true, result:result, errMsg:''});
        } catch (error) {
          //res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
          next(error);
        }
      };
    
      public DeleteProject = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const projectId = req.params.project_id;
          const projects = await this.projectService.deleteProject(projectId, req.user.id);
          //res.status(200).json(projects);
          res.status(200).json({status: 200, success: true, result:projects, errMsg:''});
        } catch (error) {
          //res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
          next(error);
        }
      };

      public MailInviteMember = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const projectId = req.params.project_id;
          const model: SetMemberDto = req.body;
          const project = await this.projectService.mailInviteMember(model, projectId, req.user.id);
          //res.status(200).json(project);
          res.status(200).json({status: 200, success: true, result:project, errMsg:''});
        } catch (error) {
          //res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
          next(error);
        }
      };
      
      
      public VerifyMember = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const projectId = req.params.project_id;
          const model: SetMemberDto = req.body;
          const project = await this.projectService.verifyMember(model, 'Tester', projectId);
          res.status(200).json({status: 200, success: true, result:project, errMsg:''});
        } catch (error) {
          next(error);
        }
      };
    
      public RemoveMember = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const projectId = req.params.project_id;
          const userId = req.params.user_id;
          const group = await this.projectService.removeMember(projectId, userId, req.user.id);
          //res.status(200).json(group);
          res.status(200).json({status: 200, success: true, result:group, errMsg:''});
        } catch (error) {
          //res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
          next(error);
        }
      };

      public calEffortOverview = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const projectId = req.params.project_id;
          const result = await this.projectService.calEffortOverview(projectId);
          //res.status(200).json(group);
          res.status(200).json({status: 200, success: true, result:result, errMsg:''});
        } catch (error) {
          //res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
          next(error);
        }
      };

      public DataOverview = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const projectId = req.params.project_id;
          const result = await this.projectService.dataOverview(projectId);
          //res.status(200).json(group);
          res.status(200).json({status: 200, success: true, result:result, errMsg:''});
        } catch (error) {
          //res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
          next(error);
        }
      };

      public NumberOfExecuteInEachMonth = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const projectId = req.params.project_id;
          const result = await this.projectService.numberOfExecuteInEachMonth(projectId);
          //res.status(200).json(group);
          res.status(200).json({status: 200, success: true, result:result, errMsg:''});
        } catch (error) {
          //res.status(error.status).json({status: error.status, success:false, result:'', errMsg: error.message});
          next(error);
        }
      };
    
  }