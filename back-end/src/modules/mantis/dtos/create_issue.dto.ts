import { IsEmail, IsNotEmpty } from 'class-validator';
import { IFile } from '../mantis.interface';
export default class CreateIssueDto {
  constructor(
    summary: string,
    description: string,
    category: string,
    testexecution_id: string,
    attachment: IFile[]
  ) {
    this.summary = summary;
    this.description = description;
    this.category = category;
    this.testexecution_id = testexecution_id;
    this.attachment = attachment;
  }
  @IsNotEmpty()
  public summary: string;

  @IsNotEmpty()
  public description: string;

  @IsNotEmpty()
  public category: string;

  @IsNotEmpty()
  public testexecution_id: string;

  public attachment: IFile[];
}