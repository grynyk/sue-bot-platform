import { Expose } from 'class-transformer';
import { IsArray, IsString } from 'class-validator';

export class CreateSkinTypeTestResultDto {
  @IsArray()
  @Expose({ name: 'answer_ids' })
  answerIds: number[];

  @IsString()
  title: string;
}
