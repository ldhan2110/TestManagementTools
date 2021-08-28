import { deserialize } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ITestStep } from '../testcase.interface';
export default class SearchTestcaseDto {
  constructor(
    testcasename: string,
    testsuite: string,
    important: string,
  ) {
    this.testcasename = testcasename;
    this.testsuite = testsuite;
    this.important = important;
  }
  @IsNotEmpty()
  public testcasename: string;

  public testsuite: string;

  public important: string;

}