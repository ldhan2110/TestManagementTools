import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export default class UploadAvatarDto {
  constructor(
    avatar: string,
  ) {
    this.avatar = avatar;
  }
  @IsNotEmpty()
  public avatar: string;

}