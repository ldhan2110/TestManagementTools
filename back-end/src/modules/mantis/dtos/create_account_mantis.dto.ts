import { IsEmail, IsNotEmpty } from 'class-validator';
export default class CreateAccountMantisDto {
  constructor(
    projectid: string,
    username: string,
    email: string,
    access_level: string
  ) {
    this.projectid = projectid;
    this.username = username;
    this.email = email;
    this.access_level = access_level;
  }
  @IsNotEmpty()
  public projectid: string;

  @IsNotEmpty()
  public username: string;

  @IsNotEmpty()
  public access_level: string;

  @IsNotEmpty()
  @IsEmail()
  public email: string;
}