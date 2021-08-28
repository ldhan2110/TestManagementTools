import { deserialize } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export default class ChangeRoleMemberDto {
  constructor(
    role: string,
    userid: string,
  ) {
    this.role = role;
    this.userid = userid;
  }

  @IsNotEmpty()
  public role: string;

  @IsNotEmpty()
  public userid: string;
}