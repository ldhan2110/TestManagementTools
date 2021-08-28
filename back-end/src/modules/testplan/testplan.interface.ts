import { IBuild } from "@modules/build";
import { IMilestone } from "@modules/milestone";
import { ITestExecution } from "@modules/testexecution";
import { ITestSuite } from "@modules/TestSuite";

export interface ITestPlan {
    _id: string;
    testplan_id: string;
    testplanname: string;
    note: string;
    is_active: boolean;
    is_open: boolean;
    is_public:boolean;
    project: string;
    milestone: IMilestone[];
    testsuite: ITestSuite[];
    build: IBuild[];
    testexecution: ITestExecution[];
    created_date?: Date | Number;
    updated_date?: Date | Number;
    created_user: string;
    updated_user: string;
  }

