import { ITestCase } from '@modules/testcase';
import { deserialize } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export default class CreateTestExecutionDto {
  constructor(
    testexecutionname: string,
    description: string,
    testplanname: string,
    buildname: string,
    is_public: boolean,
    is_active: boolean,
    assigntester: string,
    listexectestcases: ITestCase[],
    exist_testexecution: string,
    listrequirement: string[]
  ) {
    this.testexecutionname = testexecutionname;
    this.description = description;
    this.testplanname = testplanname;
    this.buildname = buildname;
    this.is_active = is_active;
    this.is_public = is_public;
    this.assigntester = assigntester;
    this.listexectestcases = listexectestcases;
    this.exist_testexecution = exist_testexecution;
    this.listrequirement = listrequirement;
  }
  @IsNotEmpty()
  public testexecutionname: string;

  @IsNotEmpty()
  public description: string;

  @IsNotEmpty()
  public testplanname: string;

  @IsNotEmpty()
  public buildname: string;

  @IsNotEmpty()
  public is_active: boolean;

  @IsNotEmpty()
  public is_public: boolean;

  public assigntester: string;

  public listexectestcases: ITestCase[];

  public exist_testexecution: string;

  public listrequirement: string[];

}