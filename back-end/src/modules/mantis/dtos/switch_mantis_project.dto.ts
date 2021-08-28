import { deserialize } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export default class SwitchMantisOfProjectDto {
  constructor(
    mantis_id: string
  ) {
    this.mantis_id = mantis_id;
  }

  @IsNotEmpty()
  public mantis_id: string;

}