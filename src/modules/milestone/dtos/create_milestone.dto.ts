import { deserialize } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export default class CreateMilestoneDto {
  constructor(
    name: string,
    target_date: Date,
    start_date: Date
  ) {
    this.name = name;
    this.target_date = target_date;
    this.start_date = start_date;
  }
  @IsNotEmpty()
  public name: string;

  @IsNotEmpty()
  public target_date: Date;

  @IsNotEmpty()
  public start_date: Date;

}