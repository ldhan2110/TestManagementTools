import { deserialize } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export default class ChangeRoleMemberMantisDto {
  constructor(
    role: string,
    email: string,
  ) {
    this.role = role;
    this.email = email;
  }

  @IsNotEmpty()
  public role: string;

  @IsNotEmpty()
  public email: string;
}