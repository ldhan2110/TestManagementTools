import { ITestCase } from '@modules/testcase';
import { deserialize } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export default class RemoveIssueDto {
  constructor(
    testexecution_id: string,
    issue_id: string

  ) {
    this.testexecution_id = testexecution_id;
    this.issue_id = issue_id;
  }

  @IsNotEmpty()
  public testexecution_id: string;

  @IsNotEmpty()
  public issue_id: string;

}