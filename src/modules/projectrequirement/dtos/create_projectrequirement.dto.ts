import { deserialize } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export default class CreateProjectRequirementDto {
  constructor(
    name: string,
    description: string,
    scope: string,
    type: string
  ) {
    this.name = name;
    this.description = description;
    this.scope = scope;
    this.type = type;
  }
  @IsNotEmpty()
  public name: string;

  @IsNotEmpty()
  public description: string;

  @IsNotEmpty()
  public scope: string;

  @IsNotEmpty()
  public type: string;

}