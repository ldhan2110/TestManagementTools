import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export default class LoginDto {
  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
  @IsNotEmpty()
  @IsEmail()
  public username: string;

  @IsNotEmpty()
  @MinLength(6)
  public password: string;
}