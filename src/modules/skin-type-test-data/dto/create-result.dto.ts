import { IsArray, IsString } from 'class-validator';

export class CreateSkinTypeTestResultDto {
  @IsArray()
  answer_ids: number[];

  @IsString()
  title: string;
}
