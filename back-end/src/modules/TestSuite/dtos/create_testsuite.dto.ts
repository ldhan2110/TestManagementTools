import { deserialize } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export default class CreateTestSuiteDto {
  constructor(
    testsuitename: string,
    description: string,
    priority: string,
    parent: string

  ) {
    this.testsuitename = testsuitename;
    this.description = description;
    this.priority = priority;
    this.parent = parent;
  }
  @IsNotEmpty()
  public testsuitename: string;

  @IsNotEmpty()
  public description: string;

  @IsNotEmpty()
  public priority: string;

  public parent: string;

}