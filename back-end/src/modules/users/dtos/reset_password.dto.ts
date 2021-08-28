import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export default class ResetPasswordDto {
  constructor(
    newpassword: string,

    confirmnewpassword: string,
  ) {
    this.newpassword = newpassword;
    this.confirmnewpassword = confirmnewpassword;
  }
  @IsNotEmpty()
  public newpassword: string;

  @IsNotEmpty()
  public confirmnewpassword: string;

}