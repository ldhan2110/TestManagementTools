import { deserialize } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export default class SwitchMantisDto {
  constructor(
    mantis_id: string,
    mantis_name: string
  ) {
    this.mantis_id = mantis_id;
    this.mantis_name = mantis_name;
  }

  @IsNotEmpty()
  public mantis_id: string;

  @IsNotEmpty()
  public mantis_name: string;

}