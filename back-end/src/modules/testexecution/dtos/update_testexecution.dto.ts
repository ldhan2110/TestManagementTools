import { ITestCase } from '@modules/testcase';
import { deserialize } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export default class UpdateTestExecutionDto {
  constructor(
    testexecutionname: string,
    listprojectrequirement: string[],
    tester: {_id: string, username: string},
    is_public: boolean,
    is_active: boolean,
    description: string,
    build: {_id: string, buildname: string},
    testplan: {_id: string, testplanname: string},
    exectestcases: ITestCase[]
  ) {
    this.testexecutionname = testexecutionname;
    this.description = description;
    this.build = build;
    this.testplan = testplan;
    this.is_active = is_active;
    this.is_public = is_public;
    this.tester = tester;
    this.listprojectrequirement = listprojectrequirement;
    this.exectestcases = exectestcases;
  }

  @IsNotEmpty()
  public description: string;

  @IsNotEmpty()
  public build: {_id: string, buildname: string};

  @IsNotEmpty()
  public testplan: {_id: string, testplanname: string};

  @IsNotEmpty()
  public testexecutionname: string;

  @IsNotEmpty()
  public is_active: boolean;

  @IsNotEmpty()
  public is_public: boolean;

  public tester: {_id: string, username: string};

  public listprojectrequirement: string[];

  public exectestcases: ITestCase[];

}