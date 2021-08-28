import { deserialize } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export default class CreateNotificationDto {
  constructor(
    description: string,
    is_read: Boolean,
    url: string,
    user: string
  ) {
    this.description = description;
    this.is_read = is_read;
    this.url = url;
    this.user = user;
  }

  @IsNotEmpty()
  public description: string;

  @IsNotEmpty()
  public is_read: Boolean;

  @IsNotEmpty()
  public url: string;

  @IsNotEmpty()
  public user: string;

}