import { PartialType } from '@nestjs/mapped-types';
import { CreateSkinTypeTestResultDto } from './create-result.dto';

export class UpdateSkinTypeTestResultDto extends PartialType(CreateSkinTypeTestResultDto) {}
