import { Route } from "@core/interfaces";
import { authMiddleware, isProjectManagerMiddleware, validationMiddleware } from "@core/middleware";
import { Router } from "express";
import CreateAccountMantisDto from "./dtos/create_account_mantis.dto";
import CreateMantisDto from "./dtos/create_mantis.dto";
import MantisController from "./mantis.controller";

export default class TestPlanRoute implements Route {
    public path = '/:project_id';
    public router = Router();
    public mantisController = new MantisController();
  
    constructor() {
      this.initializeRoutes();
    }
  
    private initializeRoutes() {

      this.router.post(
        this.path + '/api/createmantis',
        authMiddleware,
        isProjectManagerMiddleware,
        validationMiddleware(CreateMantisDto, true),
        this.mantisController.CreateMantis
      );

      this.router.post(
        this.path + '/api/createandswitchmantis',
        authMiddleware,
        isProjectManagerMiddleware,
        validationMiddleware(CreateMantisDto, true),
        this.mantisController.CreateAndSwitchMantis
      );

      this.router.put(
        this.path + '/api/mantis/addmembermantis',
        authMiddleware,
        isProjectManagerMiddleware,
        validationMiddleware(CreateAccountMantisDto, true),
        this.mantisController.AddMemberToMantis
      );

      this.router.get(
        this.path + '/api/getallmembermantis',
        authMiddleware,
        this.mantisController.GetAllMemberOfMantis
      );

      this.router.delete(
        this.path + '/api/deletemantis',
        authMiddleware,
        isProjectManagerMiddleware,
        this.mantisController.DeleteMantis
      );

      this.router.put(
        this.path + '/api/v1/changerolemembermantis',
        authMiddleware,
        isProjectManagerMiddleware,
        this.mantisController.ChangeRoleMember
      );

      this.router.put(
        this.path + '/api/mantis/removemembermantis',
        authMiddleware,
        isProjectManagerMiddleware,
        this.mantisController.RemoveMemberOfMantis
      );

      this.router.get(
        this.path + '/api/mantis/getallissue',
        authMiddleware,
        this.mantisController.GetAllIssueOfMantis
      );

      this.router.post(
        this.path + '/api/mantis/createissue',
        authMiddleware,
        this.mantisController.CreateIssue
      );

      this.router.get(
        this.path + '/api/mantis/getinformationmantis',
        authMiddleware,
        isProjectManagerMiddleware,
        this.mantisController.getInformationOfMantis
      );

      this.router.put(
        this.path + '/api/mantis/updateinformationmantis',
        authMiddleware,
        isProjectManagerMiddleware,
        this.mantisController.updateInformationOfMantis
      );

      this.router.put(
        this.path + '/api/mantis/changetoken',
        authMiddleware,
        this.mantisController.ChangeToken
      );

      this.router.put(
        this.path + '/api/mantis/addcategory',
        authMiddleware,
        this.mantisController.AddCategoryToMantis
      );

      this.router.get(
        this.path + '/api/mantis/getallcategory',
        authMiddleware,
        this.mantisController.GetAllCategoryOfMantis
      );

      this.router.put(
        this.path + '/api/mantis/removecategory',
        authMiddleware,
        this.mantisController.RemoveCategoryOfMantis
      );

      this.router.get(
        this.path + '/api/mantis/getallmantis',
        authMiddleware,
        isProjectManagerMiddleware,
        this.mantisController.GetAllProjectOfMantis
      );

      this.router.put(
        this.path + '/api/mantis/swtichmantis',
        authMiddleware,
        isProjectManagerMiddleware,
        this.mantisController.SwitchProjectMantis
      );

      this.router.get(
        this.path + '/api/v1/getallmantisofproject',
        authMiddleware,
        isProjectManagerMiddleware,
        this.mantisController.GetAllMantisOfProject
      );

      this.router.put(
        this.path + '/api/v1/swtichmantisofproject',
        authMiddleware,
        isProjectManagerMiddleware,
        this.mantisController.SwitchMantis
      );

    }
}