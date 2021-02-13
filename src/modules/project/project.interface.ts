import { IProjectRequirement } from "@modules/projectrequirement";

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
  export interface ITestPlan {
    _id: string;
    note: string;
    active: boolean;
    is_open: boolean;
    is_public:boolean;
    milestone: IMilestone[];
    testsuite: ITestSuite[];
    build: IBuild[];
    created_date?: Date | Number;
    updated_date?: Date | Number;
    created_user: string;
    updated_user: string;
  }


  export interface IMilestone{
    _id: string;
    target_date: string;
    start_date: string;
    name: string;
    created_date?: Date | Number;
    updated_date?: Date | Number;
    created_user: string;
    updated_userid: string;
  }

  export interface ITestSuite{
    _id: string;
    detail: string;
    testcase: ITestcase[];
    created_date?: Date | Number;
    updated_date?: Date | Number;
    created_user: string;
    updated_userid: string;
  }

  export interface ITestcase{
    _id: string;
    detail: string;
    teststep: ITestStep[];
    created_date?: Date | Number;
    updated_date?: Date | Number;
    created_user: string;
    updated_userid: string;
  }

  export interface ITestStep{
    _id: string;
    step_name: string;
    description: string;
    created_date?: Date | Number;
    updated_date?: Date | Number;
    created_user: string;
    updated_userid: string;
  }

  export interface IBuild {
    _id: string;
    scope: string;
    type: string;
    created_date?: Date | Number;
    updated_date?: Date | Number;
    created_user: string;
    updated_userid: string;
  }


