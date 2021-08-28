import { deserialize } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export default class UpdateProfileDto {
  constructor(
    fullname: string,
    phonenumber: string,
    introduction: string
  ) {
    this.fullname = fullname;
    this.phonenumber = phonenumber;
    this.introduction = introduction;
  }
  @IsNotEmpty()
  public fullname: string;

  public phonenumber: string;

  public introduction: string;

}