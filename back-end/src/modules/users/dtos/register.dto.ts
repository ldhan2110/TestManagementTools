import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export default class RegisterDto {
  constructor(
    fullname: string,
    username: string,
    email: string,
    password: string
  ) {
    this.fullname = fullname;
    this.username = username;
    this.email = email;
    this.password = password;
  }
  @IsNotEmpty()
  public fullname: string;

  @IsNotEmpty()
  public username: string;

  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @MinLength(6)
  public password: string;
}