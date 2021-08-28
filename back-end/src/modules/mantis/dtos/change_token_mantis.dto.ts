import { deserialize } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export default class ChangeTokenMantisDto {
  constructor(
    token: string,
  ) {
    this.token = token;
  }

  @IsNotEmpty()
  public token: string;

}