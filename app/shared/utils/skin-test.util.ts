import { isNil } from 'lodash';
import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';
import { SkinTestEnums } from '../enums';
import { skinTestMarkup } from '../markups';
import { QuestionCaptionAndKeyboardMarkup } from '../../models';

export class SkinTestUtils {
  public static getCaptionAndKeyboardMarkup(
    targetKey: string
  ): QuestionCaptionAndKeyboardMarkup {
    const caption: string = isNil(SkinTestEnums.CAPTIONS[targetKey])
      ? SkinTestEnums.CAPTIONS.DEFAULT
      : SkinTestEnums.CAPTIONS[targetKey];
    const markup: Array<InlineKeyboardButton.CallbackButton[]> = Object.keys(
      SkinTestEnums.TYPES
    ).includes(targetKey)
      ? skinTestMarkup.SUBTYPES[targetKey]
      : skinTestMarkup[targetKey];
    return { caption, markup };
  }
}
