import { TokenData } from '@core/interfaces';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export default class ResPondDto {
  constructor(
    token: string,
    refreshtoken: string,
    fullname: string,

  ) {
    this.token = token;
    this.refreshtoken = refreshtoken;
    this.fullname = fullname;

  }
  @IsNotEmpty()
  public token: string;

  @IsNotEmpty()
  public refreshtoken: string;

  @IsNotEmpty()
  public fullname: string;
}