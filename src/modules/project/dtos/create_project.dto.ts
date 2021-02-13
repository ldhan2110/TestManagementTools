import { deserialize } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export default class CreateProjectDto {
  constructor(
    name: string,
    description: string,
    active: boolean
  ) {
    this.name = name;
    this.description = description;
    this.active = active;
  }
  @IsNotEmpty()
  public name: string;

  @IsNotEmpty()
  public description: string;

  @IsNotEmpty()
  public active: boolean;
}