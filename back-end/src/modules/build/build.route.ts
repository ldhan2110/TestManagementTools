import { Route } from "@core/interfaces";
import { authMiddleware, notAllowTesterMiddleware, validationMiddleware } from "@core/middleware";
import { Router } from "express";
import CreateBuildDto from "./dtos/create_build.dto";
import BuildController from "./build.controller";

export default class BuildRoute implements Route {
    public path = '/api/build/:project_id';
    public router = Router();
  
    public buildController = new BuildController();
  
    constructor() {
      this.initializeRoutes();
    }
  
    private initializeRoutes() {

      this.router.post(
        this.path,
        authMiddleware,
        notAllowTesterMiddleware,
        validationMiddleware(CreateBuildDto),
        this.buildController.CreateBuildAndAddProject
      );

      this.router.put(
        this.path + '/:testplan_id/:build_id',
        authMiddleware,
        notAllowTesterMiddleware,
        this.buildController.AddBuildForTestPlan
      );

      this.router.post(
        this.path + '/:testplan_Id',
        authMiddleware,
        notAllowTesterMiddleware,
        validationMiddleware(CreateBuildDto, true),
        this.buildController.CreateBuildAndAddTestPlan
      );

      this.router.post(
        this.path+'/api/searchbuild',
        authMiddleware,
        this.buildController.SearchBuildOfProject
      );

      this.router.get(
        this.path,
        authMiddleware,
        this.buildController.GetAllBuildOfProject
      );

      this.router.get(
        this.path + '/getallbuildactive',
        authMiddleware,
        this.buildController.GetAllBuildOfProjectActive
      );

      this.router.get(
        this.path + '/:testplan_id/getallbuildactiveoftestplan',
        authMiddleware,
        this.buildController.GetAllBuildOfTestplantActive
      );

      this.router.get(
        this.path + '/:testplan_id',
        authMiddleware,
        this.buildController.GetAllBuildOfTestPlan
      );

      this.router.get(
        this.path + '/:build_id/getbyid',
        authMiddleware,
        this.buildController.GetBuildById
      );

      this.router.put(
        this.path + '/:build_id',
        authMiddleware,
        notAllowTesterMiddleware,
        validationMiddleware(CreateBuildDto),
        this.buildController.UpdateBuild
      );
  
      this.router.delete(
        this.path + '/:testplan_id/:build_id',
        authMiddleware,
        notAllowTesterMiddleware,
        this.buildController.RemoveBuildFromTestPlan
      );
  
      /*this.router.delete(
        this.path + '/:build_id/api/deletebuildfromproject',
        authMiddleware,
        this.buildController.DisableBuildFromProject
      );*/

      this.router.delete(
        this.path + '/:build_id/api/deletebuildfromproject',
        authMiddleware,
        notAllowTesterMiddleware,
        this.buildController.RemoveAndDeleteBuildFromProject
      );

      this.router.delete(
        this.path + '/:testplan_id/:build_id/removeandelete',
        authMiddleware,
        notAllowTesterMiddleware,
        this.buildController.RemoveAndDeleteBuildFromTestPlan
      );

      this.router.post(
        this.path + '/api/duplicatebuild',
        authMiddleware,
        notAllowTesterMiddleware,
        validationMiddleware(CreateBuildDto, true),
        this.buildController.DuplicateBuild
      );
    }
}