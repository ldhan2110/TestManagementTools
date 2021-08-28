import { IMantis } from "@modules/mantis";
import { IProject } from "@modules/project";
import { ITestExecution } from "@modules/testexecution";

export default interface IUser {
    _id: string;
    fullname: string;
    username: string;
    password: string;
    email: string;
    avatar: string;
    phonenumber: string;
    introduction: string;
    myproject: IProject[];
    inproject: IProjectRole[];
    testexecution: ITestExecution[];
    mantis: IMantisRole[];
    created_date: Date | Number;
    updated_date: Date | Number;
  }

  export interface IProjectRole {
    _id: string;
    projectname: string;
    status: string;
    description: string;
    role: string;
  }

  export interface IMantisRole {
    _id: string;
    mantisname: string;
    status: boolean;
    role: string;
  }

