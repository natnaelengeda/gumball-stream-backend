import { IsString, Length } from "class-validator";

export class CreateCommentDto {
  @IsString()
  @Length(2, 100)
  name: string;

  @IsString()
  @Length(1, 500)
  comment: string;
}