import { deserialize } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export default class CreateTestPlanDto {
  constructor(
    testplanname: string,
    description: string,
    isActive: boolean,
    isPublic: boolean
  ) {
    this.testplanname = testplanname;
    this.description = description;
    this.isActive = isActive;
    this.isPublic = isPublic;
  }
  @IsNotEmpty()
  public testplanname: string;

  @IsNotEmpty()
  public description: string;

  @IsNotEmpty()
  public isActive: boolean;

  @IsNotEmpty()
  public isPublic: boolean;

}