import { deserialize } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export default class UpdateNotificationDto {
  constructor(
    is_read: Boolean,
    id: string
  ) {
    this.is_read = is_read;
    this.id = id;
  }


  @IsNotEmpty()
  public is_read: Boolean;

  @IsNotEmpty()
  public id: string;

}