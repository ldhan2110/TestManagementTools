import { deserialize } from 'class-transformer';
import { IsDate, IsDateString, isDateString, IsEmail, IsNotEmpty, Matches, MinLength, NotContains } from 'class-validator';
export default class CreateBuildDto {
  constructor(
    buildname: string,
    description: string,
    isActive: boolean,
    isPublic: boolean,
    releasedate: Date,
    testplanname: string,
    id_exist_build: string
  ) {
    this.buildname = buildname;
    this.description = description;
    this.isActive = isActive;
    this.isPublic = isPublic;
    this.releasedate = releasedate;
    this.testplanname = testplanname;
    this.id_exist_build = id_exist_build;
  }
  @IsNotEmpty()
  public buildname: string;

  @IsNotEmpty()
  public description: string;

  @IsNotEmpty()
  public isActive: boolean;

  @IsNotEmpty()
  public isPublic: boolean;

  @IsDateString()
  public releasedate: Date;

  @IsNotEmpty()
  public testplanname: string;

  public id_exist_build: string;

}