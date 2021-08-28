import { deserialize } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export default class CreateProjectDto {
  constructor(
    projectname: string,
    description: string,
    is_public: boolean,
    active: boolean
  ) {
    this.projectname = projectname;
    this.description = description;
    this.is_public = is_public;
    this.active = active;
  }
  @IsNotEmpty()
  public projectname: string;

  @IsNotEmpty()
  public description: string;

  @IsNotEmpty()
  public is_public: boolean;

  @IsNotEmpty()
  public active: boolean;
}