import { deserialize } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export default class AddCategoryMantisDto {
  constructor(
    category_name: string,
  ) {
    this.category_name = category_name;
  }

  @IsNotEmpty()
  public category_name: string;

}