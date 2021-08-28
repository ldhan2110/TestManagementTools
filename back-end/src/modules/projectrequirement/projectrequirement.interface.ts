import { ITestExecution } from "@modules/testexecution";

export interface IProjectRequirement {
  _id: string;
  projectrequirement_id: string;
  projectrequirementname: string;
  note: string;
  is_active: boolean;
  is_open: boolean;
  is_public:boolean;
  status: boolean;
  project: string;
  testexecution: ITestExecution[];
  created_date?: Date | Number;
  updated_date?: Date | Number;
  created_user: string;
  updated_user: string;
  }