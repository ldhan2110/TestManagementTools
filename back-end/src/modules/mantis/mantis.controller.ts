import { NextFunction, Request, Response } from 'express';
import { IMantis } from '.';
import AddCategoryMantisDto from './dtos/add_category.dto';
import ChangeRoleMemberMantisDto from './dtos/change_role_mantis.dto';
import ChangeTokenMantisDto from './dtos/change_token_mantis.dto';
import CreateAccountMantisDto from './dtos/create_account_mantis.dto';
import CreateIssueDto from './dtos/create_issue.dto';
import CreateMantisDto from './dtos/create_mantis.dto';
import SwitchMantisDto from './dtos/switch_mantis.dto';
import SwitchMantisOfProjectDto from './dtos/switch_mantis_project.dto';
import UpdateMantisDto from './dtos/update_mantis.dto';
import MantisService from './mantis.services';


export default class MantisController {
    private mantisService = new MantisService();
  
    public CreateMantis = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const model: CreateMantisDto = req.body;
        const users = await this.mantisService.createMantis(req.user.id, req.params.project_id, model);
        res.status(200).json({status: 200, success: true, result:"success", errMsg:''});
      } catch (error) {
        next(error);
      }
    };

    public CreateAndSwitchMantis = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const model: CreateMantisDto = req.body;
        const users = await this.mantisService.createAndSwitchMantis(req.user.id, req.params.project_id, model);
        res.status(200).json({status: 200, success: true, result:"success", errMsg:''});
      } catch (error) {
        next(error);
      }
    };

    public AddMemberToMantis = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const model: CreateAccountMantisDto = req.body;
        const users = await this.mantisService.addMemberToMantis(model, req.user.id);
        res.status(200).json({status: 200, success: true, result:"success", errMsg:''});
      } catch (error) {
        next(error);
      }
    };

    public GetAllMemberOfMantis = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const users = await this.mantisService.getAllMemberOfMantis(req.params.project_id);
        res.status(200).json({status: 200, success: true, result:users, errMsg:''});
      } catch (error) {
        next(error);
      }
    };

    public DeleteMantis = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const users = await this.mantisService.deleteMantis(req.params.project_id, req.user.id);
        res.status(200).json({status: 200, success: true, result:users, errMsg:''});
      } catch (error) {
        next(error);
      }
    };

    public ChangeRoleMember = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const model: ChangeRoleMemberMantisDto = req.body;
        const users = await this.mantisService.changeRoleMember(model,req.params.project_id, req.user.id);
        res.status(200).json({status: 200, success: true, result:"success", errMsg:''});
      } catch (error) {
        next(error);
      }
    };

    public RemoveMemberOfMantis = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const model: CreateAccountMantisDto = req.body;
        const remove_member = await this.mantisService.removeMemberOfMantis(model, req.user.id);
        res.status(200).json({status: 200, success: true, result:"success", errMsg:''});
      } catch (error) {
        next(error);
      }
    };

    public GetAllIssueOfMantis = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const page_size: number = Number(req.query.page_size);
        const page: number = Number(req.query.page);
        const list_issue = await this.mantisService.getAllIssueOfMantis(req.user.id, req.params.project_id, page_size, page);
        res.status(200).json({status: 200, success: true, result:list_issue, errMsg:''});
      } catch (error) {
        next(error);
      }
    };

    public CreateIssue = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const model: CreateIssueDto = req.body;
        const list_issue = await this.mantisService.createIssue(req.user.id, req.params.project_id, model);
        res.status(200).json({status: 200, success: true, result:list_issue, errMsg:''});
      } catch (error) {
        next(error);
      }
    };

    public getInformationOfMantis = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const infor_mantis = await this.mantisService.getInformationOfMantis(req.params.project_id);
        res.status(200).json({status: 200, success: true, result:infor_mantis, errMsg:''});
      } catch (error) {
        next(error);
      }
    };

    public updateInformationOfMantis = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const model: UpdateMantisDto = req.body;
        const list_issue = await this.mantisService.updateInformationMantis(req.params.project_id, model);
        res.status(200).json({status: 200, success: true, result:"success", errMsg:''});
      } catch (error) {
        next(error);
      }
    };

    public ChangeToken = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const model: ChangeTokenMantisDto = req.body;
        const list_issue = await this.mantisService.changeToken(model, req.params.project_id, req.user.id);
        res.status(200).json({status: 200, success: true, result:"success", errMsg:''});
      } catch (error) {
        next(error);
      }
    };

    public AddCategoryToMantis = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const model: AddCategoryMantisDto = req.body;
        const add_category = await this.mantisService.addCategoryToMantis(req.params.project_id, model);
        res.status(200).json({status: 200, success: true, result:"success", errMsg:''});
      } catch (error) {
        next(error);
      }
    };

    public GetAllCategoryOfMantis = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const model: ChangeTokenMantisDto = req.body;
        const list_category = await this.mantisService.getAllCategoryOfMantis(req.user.id,req.params.project_id);
        res.status(200).json({status: 200, success: true, result:list_category, errMsg:''});
      } catch (error) {
        next(error);
      }
    };

    public RemoveCategoryOfMantis = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const model: AddCategoryMantisDto = req.body;
        const add_category = await this.mantisService.removeCategoryOfMantis(model, req.params.project_id);
        res.status(200).json({status: 200, success: true, result:"success", errMsg:''});
      } catch (error) {
        next(error);
      }
    };

    public GetAllProjectOfMantis = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const list_mantis = await this.mantisService.getAllProjectOfMantis(req.user.id,req.params.project_id);
        res.status(200).json({status: 200, success: true, result:list_mantis, errMsg:''});
      } catch (error) {
        next(error);
      }
    };

    public SwitchProjectMantis = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const model: SwitchMantisDto = req.body;
        const list_mantis = await this.mantisService.switchProjectMantis(req.params.project_id, model);
        res.status(200).json({status: 200, success: true, result:list_mantis, errMsg:''});
      } catch (error) {
        next(error);
      }
    };

    public GetAllMantisOfProject = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const list_mantis = await this.mantisService.getAllMantisOfProject(req.params.project_id);
        res.status(200).json({status: 200, success: true, result:list_mantis, errMsg:''});
      } catch (error) {
        next(error);
      }
    };

    public SwitchMantis = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const model: SwitchMantisOfProjectDto = req.body;
        const list_mantis = await this.mantisService.switchMantis(req.params.project_id, model);
        res.status(200).json({status: 200, success: true, result:list_mantis, errMsg:''});
      } catch (error) {
        next(error);
      }
    };

  }