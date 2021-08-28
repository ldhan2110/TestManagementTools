import { IsEmail, IsNotEmpty } from 'class-validator';
export default class UpdateMantisDto {
  constructor(
    url: string,
    project_name: string
  ) {
    this.url = url;
    this.project_name = project_name;
  }
  @IsNotEmpty()
  public url: string;

  @IsNotEmpty()
  public project_name: string;
}