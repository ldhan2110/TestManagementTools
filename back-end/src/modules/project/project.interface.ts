import { IBuild } from "@modules/build";
import { IMilestone } from "@modules/milestone";
import { INotification } from "@modules/notification";
import { IProjectRequirement } from "@modules/projectrequirement";
import { ITestCase } from "@modules/testcase";
import { ITestExecution } from "@modules/testexecution";
import { ITestPlan } from "@modules/testplan/testplan.interface";
import { ITestSuite } from "@modules/TestSuite";

export default interface IProject {
    _id: string;
    projectname: string;
    description: string;
    status: string;
    active: boolean;
    is_public: boolean;
    mantis: string;
    members: IMember[];
    projectrequirement: IProjectRequirement[];
    testplan: ITestPlan[];
    build: IBuild[];
    milestone: IMilestoneMember[];
    testsuite: ITestSuite[];
    testcase: ITestCase[];
    testexecution: ITestExecution[];
    //notification: INotification[];
    created_date?: Date | Number;
    updated_date?: Date | Number;
    created_user: string;
    updated_user: string;
  }
  export interface IMember {
    user: string;
    username: string;
    fullname: string;
    email: string;
    role: string;
    date?: Date | Number;
  }

  export interface IMilestoneMember {
    milestoneid: string;
    milestonename: string;
  }