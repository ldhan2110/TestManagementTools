import { deserialize } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export default class CreateProjectRequirementDto {
  constructor(
    projectrequirementname: string,
    description: string,
    isActive: boolean,
    isPublic: boolean
  ) {
    this.projectrequirementname = projectrequirementname;
    this.description = description;
    this.isActive = isActive;
    this.isPublic = isPublic;
  }
  @IsNotEmpty()
  public projectrequirementname: string;

  @IsNotEmpty()
  public description: string;

  @IsNotEmpty()
  public isActive: boolean;

  @IsNotEmpty()
  public isPublic: boolean;

}