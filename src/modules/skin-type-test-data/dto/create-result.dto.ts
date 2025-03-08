import { IsArray, IsString } from 'class-validator';

export class CreateSkinTypeTestResultDto {
  @IsArray()
  answerIds: number[];

  @IsString()
  title: string;
}
