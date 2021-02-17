import { IProjectRequirement } from "@modules/projectrequirement";
import { ITestPlan } from "@modules/testplan/testplan.interface";

export default interface IProject {
    _id: string;
    description: string;
    color: string;
    active: boolean;
    is_public: boolean;
    members: IMember[];
    projectrequirement: IProjectRequirement[];
    testplan: ITestPlan[];
    created_date?: Date | Number;
    updated_date?: Date | Number;
    created_user: string;
    updated_user: string;
  }
  export interface IMember {
    user: string;
    role: string;
    date?: Date | Number;
  }