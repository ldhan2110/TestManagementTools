import { ITestExecution } from "@modules/testexecution";

export interface IBuild {
    _id: string;
    build_id: string;
    buildname: string;
    description: string;
    is_active: boolean;
    is_open: boolean;
    is_disable: boolean;
    project: string;
    testplan: string;
    testexecution: ITestExecution[];
    releasedate?: Date | Number;
    created_date?: Date | Number;
    updated_date?: Date | Number;
    created_user: string;
    updated_userid: string;
  }