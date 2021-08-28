import { Route } from "@core/interfaces";
import { authMiddleware, isProjectManagerMiddleware, notAllowTesterMiddleware, resetMiddleware, validationMiddleware } from "@core/middleware";
import { Router } from "express";
import ChangeRoleMemberDto from "./dtos/change_role.dto";
import CreateProjectDto from "./dtos/create_project.dto";
import SetMemberDto from "./dtos/set_member.dto";
import UpdateProjectDto from "./dtos/update_project.dto";
import ProjectController from "./project.controller";

export default class ProjectRoute implements Route {
    public path = '/project';
    public router = Router();
  
    public projectController = new ProjectController();
  
    constructor() {
      this.initializeRoutes();
    }
  
    private initializeRoutes() {
      // Project
      this.router.post(
        this.path + '/createproject',
        authMiddleware,
        validationMiddleware(CreateProjectDto),
        this.projectController.CreateProject
      );

      this.router.get(
        this.path + '/allproject', 
        this.projectController.GetAllProject
      );

      this.router.get(
        this.path + '/myproject', 
        authMiddleware, 
        this.projectController.GetAllProjectByCreatedUser
      );

      this.router.get(
        this.path + '/api/inproject', 
        authMiddleware, 
        this.projectController.GetAllProjectByUserJoin
      );

      this.router.get(
        this.path + '/inproject',
        authMiddleware,
        this.projectController.GetRoleUserJoin
      );

      this.router.get(
        this.path + '/members/:project_id',
        this.projectController.GetAllMembers
      );

      this.router.get(
        this.path + '/getprojectbyid/:project_id',
        authMiddleware,
        this.projectController.GetProjectById
      );

      this.router.get(
        this.path + '/getnameproject/:project_id',
        resetMiddleware,
        this.projectController.GetProjectById
      );
  
      this.router.put(
        this.path + '/updateproject/:project_id',
        authMiddleware,
        isProjectManagerMiddleware,
        validationMiddleware(UpdateProjectDto),
        this.projectController.UpdateProject
      );

      this.router.put(
        this.path + '/changerole/:project_id',
        authMiddleware,
        validationMiddleware(ChangeRoleMemberDto),
        this.projectController.ChangeRoleMember
      );

      this.router.delete(
        this.path + '/deleteproject/:project_id',
        authMiddleware,
        isProjectManagerMiddleware,
        this.projectController.DeleteProject
      );

      this.router.post(
        this.path + '/members/:project_id',
        authMiddleware,
        notAllowTesterMiddleware,
        validationMiddleware(SetMemberDto),
        this.projectController.MailInviteMember
      );

      this.router.post(
        this.path + '/members/verifymember/:project_id',
        resetMiddleware,
        this.projectController.VerifyMember
      );
  
      this.router.delete(
        this.path + '/members/:project_id/:user_id',
        authMiddleware,
        notAllowTesterMiddleware,
        this.projectController.RemoveMember
      );

      this.router.get(
        this.path + '/:project_id/caleffortoverview',
        authMiddleware,
        this.projectController.calEffortOverview
      );

      this.router.get(
        this.path + '/:project_id/dataoverview',
        authMiddleware,
        this.projectController.DataOverview
      );

      this.router.get(
        this.path + '/:project_id/numberofexecuteineachmonth',
        authMiddleware,
        this.projectController.NumberOfExecuteInEachMonth
      );

    }
}