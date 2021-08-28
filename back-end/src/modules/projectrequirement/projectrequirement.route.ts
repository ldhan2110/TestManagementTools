import { Route } from "@core/interfaces";
import { authMiddleware, notAllowTesterMiddleware, validationMiddleware } from "@core/middleware";
import { Router } from "express";
import CreateProjectRequirementDto from "./dtos/create_projectrequirement.dto";
import ProjectRequirementController from "./projectrequirement.controller";


export default class ProjectRequirementRoute implements Route {
  public path = '';
  public router = Router();

  public projectrequirementController = new ProjectRequirementController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {    

    this.router.post(
      this.path + '/:project_id/createtrequirements',
      authMiddleware,
      notAllowTesterMiddleware,
      validationMiddleware(CreateProjectRequirementDto),
      this.projectrequirementController.CreateProjectRequirementAndAddProject
    );

    /*this.router.delete(
      this.path + '/:project_id/:projectrequirement_id/api/deleteprojectrequirement',
      authMiddleware,
      this.projectrequirementController.DisableProjectRequirement
    );*/

    this.router.delete(
      this.path + '/:project_id/:projectrequirement_id/api/deleterequirements',
      authMiddleware,
      notAllowTesterMiddleware,
      this.projectrequirementController.RemoveAndDeleteProjectRequirement
    );

    this.router.put(
      this.path + '/:project_id/:projectrequirement_id/api/updaterequirements',
      authMiddleware,
      notAllowTesterMiddleware,
      validationMiddleware(CreateProjectRequirementDto),
      this.projectrequirementController.UpdateProjectRequirement
    );

    this.router.get(
      this.path + '/:project_id/getallrequirementsbyid',
      authMiddleware,
      this.projectrequirementController.GetAllProjectRequirementOfProject
    );

    this.router.get(
      this.path + '/:project_id/getallrequirementsactive',
      authMiddleware,
      this.projectrequirementController.GetAllProjectRequirementOfProjectActive
    );

    this.router.post(
      this.path + '/:project_id/api/searchprojectrequirement',
      authMiddleware,
      this.projectrequirementController.SearchProjectRequirementOfProject
    );

    /*this.router.post(
      this.path + '/:project_id/api/getallbuildofprojectrequirement',
      authMiddleware,
      this.projectrequirementController.GetAllBuildOfProjectRequirement
    );

    this.router.get(
      this.path + '/:project_id/:projectrequirement_id/api/duplicateprojectrequirement',
      //authMiddleware,
      this.projectrequirementController.DuplicateProjectRequirement
    );*/
  }
}