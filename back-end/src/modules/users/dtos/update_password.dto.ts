import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export default class UpdatePasswordDto {
  constructor(
    Password: string,
    ConfirmPassword: string,
  ) {
    this.Password = Password;
    this.ConfirmPassword = ConfirmPassword;
  }
  @IsNotEmpty()
  public Password: string;

  @IsNotEmpty()
  public ConfirmPassword: string;

}