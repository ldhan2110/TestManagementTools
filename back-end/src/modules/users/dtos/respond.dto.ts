import { TokenData } from '@modules/auth';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export default class RespondDto {
  constructor(
    token: TokenData,
    username: string,
  ) {
    this.token = token;
    this.username = username;
  }
  @IsNotEmpty()
  public token: TokenData;

  @IsNotEmpty()
  public username: string;
}