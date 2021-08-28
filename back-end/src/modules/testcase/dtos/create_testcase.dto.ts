import { deserialize } from 'class-transformer';
import { IsEmail, IsNotEmpty, Matches, MATCHES, MinLength } from 'class-validator';
import { ITestStep } from '../testcase.interface';
export default class CreateTestCaseDto {
  constructor(
    testcaseName: string,
    description: string,
    testsuite: string,
    priority: string,
    precondition: string,
    postcondition: string,
    listStep: ITestStep[]
    //type: string,

  ) {
    this.testcaseName = testcaseName;
    this.description = description;
    this.testsuite = testsuite;
    this.priority = priority;
    this.precondition = precondition;
    this.postcondition = postcondition;
    this.listStep = listStep;
    //this.type = type;
  }
  @IsNotEmpty()
  public testcaseName: string;

  @IsNotEmpty()
  public description: string;

  @IsNotEmpty()
  public testsuite: string;

  @IsNotEmpty()
  public priority: string;

  public precondition: string;

  public postcondition: string;

  public listStep: ITestStep[];

  //@IsNotEmpty()
  //public type: string;

}