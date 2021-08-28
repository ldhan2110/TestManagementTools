import { deserialize } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export default class InforProjectDto {
  constructor(
    projectName: string,
    description: string,
    status: string,
  ) {
    this.projectName = projectName;
    this.description = description;
    this.status = status;
  }
  @IsNotEmpty()
  public projectName: string;

  @IsNotEmpty()
  public description: string;

  @IsNotEmpty()
  public status: string;
}