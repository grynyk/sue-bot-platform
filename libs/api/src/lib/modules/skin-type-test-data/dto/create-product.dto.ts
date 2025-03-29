import { IsEnum, IsString, IsUrl } from 'class-validator';
import { PRODUCT_SIZE, SEASON } from '@sue-bot-platform/types';

export class CreateSkinTypeTestProductDto {
  @IsString()
  title: string;

  @IsEnum(SEASON)
  season: SEASON;

  @IsEnum(PRODUCT_SIZE)
  size: PRODUCT_SIZE;

  @IsString()
  image: string;

  @IsUrl()
  url: string;

  @IsString()
  ingredients: string;

  @IsString()
  routine: string;

  @IsString()
  recommendations: string;
}
