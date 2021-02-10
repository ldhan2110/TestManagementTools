import { Route } from "@core/interfaces";
import { Router } from "express";
import ProjectController from "./project.controller";

export default class ProjectRoute implements Route {
    public path = '/api/project';
    public router = Router();
  
    public projectController = new ProjectController();
  
    constructor() {
      this.initializeRoutes();
    }
  
    private initializeRoutes() {
      this.router.post(
        this.path,
        this.projectController.createProject
      );    
  }