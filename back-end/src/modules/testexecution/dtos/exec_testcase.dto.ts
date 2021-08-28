import { ITestCase } from '@modules/testcase';
import { deserialize } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ITestStepExecution } from '../testexecution.interface';
export default class ExecTestcaseDto {
  constructor(
    testcaseid: string,
    status: string,
    note: string,
    listStep: ITestStepExecution[]
  ) {
    this.testcaseid = testcaseid;
    this.status = status;
    this.note = note;
    this.listStep = listStep;
  }
  @IsNotEmpty()
  public testcaseid: string;

  @IsNotEmpty()
  public status: string;

  public note: string;

  public listStep: ITestStepExecution[];

}