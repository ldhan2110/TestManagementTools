import { ITestCase } from '@modules/testcase';
import { deserialize } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export default class ExecTestexecutionDto {
  constructor(
    status: string,

  ) {
    this.status = status;

  }
  @IsNotEmpty()
  public status: string;

}