import { ITestCase } from '@modules/testcase';
import { deserialize } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export default class AddIssueToExecutionDto {
  constructor(
    url: string,
    issue_id: string,
    testexecution_id: string

  ) {
    this.url = url;
    this.issue_id = issue_id;
    this.testexecution_id = testexecution_id;
  }

  @IsNotEmpty()
  public url: string;

  @IsNotEmpty()
  public issue_id: string;

  @IsNotEmpty()
  public testexecution_id: string;


}