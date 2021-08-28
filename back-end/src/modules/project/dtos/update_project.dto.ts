import { deserialize } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export default class UpdateProjectDto {
  constructor(
    projectname: string,
    description: string,
    status: string,
    is_public: boolean,
    active: boolean
  ) {
    this.projectname = projectname;
    this.description = description;
    this.status = status;
    this.is_public = is_public;
    this.active = active;
  }
  @IsNotEmpty()
  public projectname: string;

  @IsNotEmpty()
  public description: string;

  @IsNotEmpty()
  public status: string;

  @IsNotEmpty()
  public is_public: boolean;

  @IsNotEmpty()
  public active: boolean;
}