import { ITestCase } from "@modules/testcase";

export interface ITestSuite{
    _id: string;
    testsuite_id: string;
    testsuitename: string;
    detail: string;
    testcase: ITestCase[];
    testsuite_child: ITestSuite[];
    testsuite_parent: string; 
    project: string;
    is_assigned: boolean;
    total_testcase: number;
    numberof_testcaseuntest: number;
    created_date?: Date | Number;
    updated_date?: Date | Number;
    created_user: string;
    updated_userid: string;
  }

