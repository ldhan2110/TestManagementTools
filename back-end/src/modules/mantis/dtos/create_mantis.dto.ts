import { IsEmail, IsNotEmpty } from 'class-validator';
export default class CreateMantisDto {
  constructor(
    url: string,
    token: string,
    project: string
  ) {
    this.url = url;
    this.token = token;
    this.project = project;
  }
  @IsNotEmpty()
  public url: string;

  public token: string;

  @IsNotEmpty()
  public project: string;
}