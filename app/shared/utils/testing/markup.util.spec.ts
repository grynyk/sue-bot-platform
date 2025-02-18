import { KeyboardMarkupUtils } from '../markup.util';
import { MARKUP_DIRECTION } from '../../enums';
import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';

jest.mock('../../markups', () => ({
  buttonsMarkup: {
    urlButton: jest.fn((text, url) => [{ text, url }]),
    callbackButton: jest.fn((text, callback_data) => [{ text, callback_data }]),
  },
}));

describe('KeyboardMarkupUtils', () => {
  describe('createButtons', () => {
    it('should create horizontal buttons', () => {
      const buttons: InlineKeyboardButton[] = [
        { text: 'Button 1', callback_data: 'callback_1' },
        { text: 'Button 2', callback_data: 'http://example.com' },
      ];
      const result = KeyboardMarkupUtils.createButtons(
        buttons,
        MARKUP_DIRECTION.HORIZONTAL
      );
      expect(result).toEqual([
        [
          { text: 'Button 1', callback_data: 'callback_1' },
          { text: 'Button 2', url: 'http://example.com' },
        ],
      ]);
    });

    it('should create vertical buttons', () => {
      const buttons: InlineKeyboardButton[] = [
        { text: 'Button 1', callback_data: 'callback_1' },
        { text: 'Button 2', callback_data: 'http://example.com' },
      ];
      const result = KeyboardMarkupUtils.createButtons(
        buttons,
        MARKUP_DIRECTION.VERTICAL
      );
      expect(result).toEqual([
        [{ text: 'Button 1', callback_data: 'callback_1' }],
        [{ text: 'Button 2', url: 'http://example.com' }],
      ]);
    });

    it('should skip buttons with missing callback_data or text', () => {
      const buttons: InlineKeyboardButton[] = [
        { text: 'Button 1', callback_data: 'callback_1' },
        { text: 'Button 2', callback_data: undefined },
      ];
      const result = KeyboardMarkupUtils.createButtons(
        buttons,
        MARKUP_DIRECTION.VERTICAL
      );
      expect(result).toEqual([
        [{ text: 'Button 1', callback_data: 'callback_1' }],
      ]);
    });
  });
});
