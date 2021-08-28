import { deserialize } from 'class-transformer';
import { IsDateString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export default class CreateMilestoneDto {
  constructor(
    milestonetitle: string,
    description: string,
    start_date: Date,
    end_date: Date,
    is_completed: boolean
  ) {
    this.milestonetitle = milestonetitle;
    this.description = description;
    this.start_date = end_date;
    this.end_date = start_date;
    this.is_completed = is_completed;
  }
  @IsNotEmpty()
  public milestonetitle: string;

  @IsNotEmpty()
  public description: string;

  @IsDateString()
  public start_date: Date;

  @IsDateString()
  public end_date: Date;

  @IsNotEmpty()
  public is_completed: boolean;

}