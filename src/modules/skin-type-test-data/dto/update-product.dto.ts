import { PartialType } from '@nestjs/mapped-types';
import { CreateSkinTypeTestProductDto } from './create-product.dto';

export class UpdateSkinTypeTestProductDto extends PartialType(CreateSkinTypeTestProductDto) {}