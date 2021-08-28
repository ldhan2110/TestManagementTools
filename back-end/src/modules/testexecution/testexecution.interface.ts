import { IUser } from "@modules/auth";
import { IProjectRequirement } from "@modules/projectrequirement";
import { ITestCase } from "@modules/testcase";
import { ITestPlan } from "@modules/testplan";

export interface ITestExecution {
    _id: string;
    testexecutionname: string;
    description: string;
    is_active: boolean;
    is_public:boolean;
    project: string;
    testplan: string;
    build: string;
    status: string;
    tester: string;
    exectestcases: ITestCase[];
    listprojectrequirement: IProjectRequirement[];
    listtestcases: ITestCase[];
    issue: IIssue_Execution[];
    created_date?: Date | Number;
    updated_date?: Date | Number;
    created_user: string;
    updated_user: string;
  }

  export interface ITestCaseExecution{
    testcaseName: string;
    description: string;
    testsuite: string;
    priority: string;
    listStep: ITestStepExecution[];
    status: string;
    note: string;
  }

  export interface ITestStepExecution{
    stepDefine: string;
    expectResult: string;
    type: string;
    note: string;
    status: string;
  }

  export interface IIssue_Execution{
    issue_id: string;
    url: string;
  }

