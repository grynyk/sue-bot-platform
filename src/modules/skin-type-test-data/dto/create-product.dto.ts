import { IsEnum, IsString, IsUrl, IsUUID } from 'class-validator';
import { PRODUCT_SIZE, SEASON } from '../../../scenes/skin-type-test/enums/skin-test.enum';

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

  @IsUUID()
  resultId: string;
}