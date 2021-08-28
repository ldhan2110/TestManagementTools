import { deserialize } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export default class CreateBuildDto {
  constructor(
    buildname: string,
    description: string,
    isActive: boolean,
    isPublic: boolean,
    releasedate: Date,
    testplanname: string
  ) {
    this.buildname = buildname;
    this.description = description;
    this.isActive = isActive;
    this.isPublic = isPublic;
    this.releasedate = releasedate;
    this.testplanname = testplanname;
  }
  @IsNotEmpty()
  public buildname: string;

  @IsNotEmpty()
  public description: string;

  @IsNotEmpty()
  public isActive: boolean;

  @IsNotEmpty()
  public isPublic: boolean;

  @IsNotEmpty()
  public releasedate: Date;

  @IsNotEmpty()
  public testplanname: string;

}