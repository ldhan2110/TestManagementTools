import { deserialize } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export default class CreateTestPlanDto {
  constructor(
    name: string,
    description: string,
    isActive: boolean,
    isPublic: boolean
  ) {
    this.name = name;
    this.description = description;
    this.isActive = isActive;
    this.isPublic = isPublic;
  }
  @IsNotEmpty()
  public name: string;

  @IsNotEmpty()
  public description: string;

  @IsNotEmpty()
  public isActive: boolean;

  @IsNotEmpty()
  public isPublic: boolean;

}