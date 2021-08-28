import { ITestExecution } from "@modules/testexecution";

export interface ITestCase{
    _id: string;
    testcaseName: string;
    testcase_id: string;
    description: string;
    priority: string;
    is_assigned: boolean;
    total_assigned: number;
    precondition: string;
    postcondition: string;
    project: string;
    testsuite: string;
    testexecution: ITestExecution[];
    listStep: ITestStep[];
    created_date?: Date | Number;
    updated_date?: Date | Number;
    created_user: string;
    updated_userid: string;
  }

  export interface ITestStep{
    _id: string;
    stepDefine: string;
    expectResult: string;
    type: string;
  }