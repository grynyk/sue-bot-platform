import { Action, Ctx, InjectBot, Scene } from 'nestjs-telegraf';
import { Markup, Telegraf } from 'telegraf';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { InlineKeyboardMarkup, Message } from '@telegraf/types';
import { SceneNavigation, SceneStateService } from '@shared/scene-navigation';
import { NAVIGATION_CALLBACK } from '@models/navigation.model';
import { SCENE_ID, SceneContext } from '@models/scenes.model';
import { isBotCommand } from '@utils/command.utils';
import { BotUser, BotUserDataService } from '@modules/bot-user-data';
import { getSettingsInitialKeyboard, getSettingsNotificationsKeyboard } from './utils/keyboard.factory';
import { SettingsSceneContextType } from './models/settings.model';
import { get, isBoolean, isNil, range } from 'lodash';
import { SETTINGS } from './constants/settings.constant';
import { PARSE_MODE } from '@models/tg.model';
import { InlineKeyboardButton } from 'typegram';
import { backButton } from '@utils/keyboard.utils';

@Scene(SCENE_ID.SETTINGS)
export class SettingsScene extends SceneNavigation {
  constructor(
    @InjectBot() protected readonly bot: Telegraf,
    @InjectPinoLogger() protected readonly logger: PinoLogger,
    protected readonly stateService: SceneStateService,
    private readonly botUserDataService: BotUserDataService
  ) {
    super(bot, logger, stateService, SCENE_ID.SETTINGS);
  }

  @Action(NAVIGATION_CALLBACK.START)
  async onStart(@Ctx() ctx: SceneContext): Promise<void> {
    try {
      const keyboard: Markup.Markup<InlineKeyboardMarkup> = getSettingsInitialKeyboard();
      if (isBotCommand(ctx.text)) {
        const message: Message.TextMessage = await ctx.reply('Доступні налаштування:', keyboard);
        this.stateService.setMessageId(message.message_id);
      } else {
        await ctx.answerCbQuery();
        await ctx.editMessageText('Доступні налаштування:', keyboard);
      }
    } catch (error) {
      this.logger.error(`${ctx.text} onStart: ${error.message}`);
    }
  }

  @Action(/^SETTINGS_/)
  async onSettingCallback(@Ctx() ctx: SceneContext): Promise<void> {
    try {
      const callbackData: SettingsSceneContextType = get(ctx.callbackQuery, 'data') as SettingsSceneContextType;
      this.stateService.storeCallback(callbackData);
      if (callbackData === SETTINGS.CALLBACKS.MAIN.NOTIFICATIONS) {
        this.onNotificationsSettings(ctx);
        return;
      }
    } catch (error) {
      this.logger.error(`${ctx.text}: ${error.message}`);
    }
  }

  @Action(/^NOTIFICATIONS_/)
  async onNotificationSettingsCallback(@Ctx() ctx: SceneContext): Promise<void> {
    try {
      const callbackData: SettingsSceneContextType = get(ctx.callbackQuery, 'data') as SettingsSceneContextType;
      if (callbackData === SETTINGS.CALLBACKS.NOTIFICATIONS.DISABLE) {
        this.onDisableNotifications(ctx);
        return;
      }
      if (callbackData === SETTINGS.CALLBACKS.NOTIFICATIONS.ENABLE) {
        this.onEnableNotifications(ctx);
        return;
      }
      if (callbackData === SETTINGS.CALLBACKS.NOTIFICATIONS.WAKE_UP_TIME) {
        this.onSetWakeUpTime(ctx);
        return;
      }
      if (callbackData === SETTINGS.CALLBACKS.NOTIFICATIONS.BED_TIME) {
        this.onSetBedTime(ctx);
        return;
      }
    } catch (error) {
      this.logger.error(`${ctx.text}: ${error.message}`);
    }
  }

  @Action(/^WAKE_UP_TIME_(([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9])/)
  async onSetWakeUpTimeCallback(@Ctx() ctx: SceneContext): Promise<void> {
    try {
      const wake_up_time: string = ctx.match[1];
      await this.botUserDataService.update(ctx.from.id, { wake_up_time });
      this.stateService.removeLastCallback();
      this.onNotificationsSettings(ctx);
    } catch (error) {
      this.logger.error(`${ctx.text}: ${error.message}`);
    }
  }

  @Action(/^BED_TIME_(([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9])/)
  async onSetBedTimeCallback(@Ctx() ctx: SceneContext): Promise<void> {
    try {
      const bed_time: string = ctx.match[1];
      await this.botUserDataService.update(ctx.from.id, { bed_time });
      this.stateService.removeLastCallback();
      this.onNotificationsSettings(ctx);
    } catch (error) {
      this.logger.error(`${ctx.text}: ${error.message}`);
    }
  }

  private async onDisableNotifications(ctx: SceneContext): Promise<void> {
    try {
      await this.botUserDataService.update(ctx.from.id, { notifications_enabled: false });
      await this.onNotificationsSettings(ctx);
    } catch (error) {
      this.logger.error(`${ctx.text}: ${error.message}`);
    }
  }

  private async onEnableNotifications(ctx: SceneContext): Promise<void> {
    try {
      await this.botUserDataService.update(ctx.from.id, { notifications_enabled: true });
      await this.onNotificationsSettings(ctx);
    } catch (error) {
      this.logger.error(`${ctx.text}: ${error.message}`);
    }
  }

  private async onSetWakeUpTime(ctx: SceneContext): Promise<void> {
    try {
      const callbackData: SettingsSceneContextType = get(ctx.callbackQuery, 'data') as SettingsSceneContextType;
      this.stateService.storeCallback(callbackData);
      const buttons: InlineKeyboardButton.CallbackButton[] = range(6, 10).flatMap((hour: number): InlineKeyboardButton.CallbackButton[] =>
        range(0, 60, 10).map((minute: number): InlineKeyboardButton.CallbackButton => {
          const time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
          return Markup.button.callback(time, `WAKE_UP_TIME_${time}`);
        })
      );
      const keyboard: Markup.Markup<InlineKeyboardMarkup> = Markup.inlineKeyboard([...buttons, backButton], { columns: 4 });
      await ctx.editMessageText('Оберіть час прокидання:', keyboard);
    } catch (error) {
      this.logger.error(`${ctx.text}: ${error.message}`);
    }
  }


  private async onSetBedTime(ctx: SceneContext): Promise<void> {
    try {
      const callbackData: SettingsSceneContextType = get(ctx.callbackQuery, 'data') as SettingsSceneContextType;
      this.stateService.storeCallback(callbackData);
      const buttons: InlineKeyboardButton.CallbackButton[] = range(22, 24).flatMap((hour: number): InlineKeyboardButton.CallbackButton[] =>
        range(0, 60, 10).map((minute: number): InlineKeyboardButton.CallbackButton => {
          const time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
          return Markup.button.callback(time, `BED_TIME_${time}`);
        })
      );
      const keyboard: Markup.Markup<InlineKeyboardMarkup> = Markup.inlineKeyboard([...buttons, backButton], { columns: 4 });
      await ctx.editMessageText('Оберіть час сну:', keyboard);
    } catch (error) {
      this.logger.error(`${ctx.text}: ${error.message}`);
    }
  }

  private async onNotificationsSettings(ctx: SceneContext): Promise<void> {
    try {
      await ctx.answerCbQuery();
      const user: BotUser = await this.botUserDataService.findOne(ctx.from.id);
      const keyboard: Markup.Markup<InlineKeyboardMarkup> = getSettingsNotificationsKeyboard(user.notifications_enabled);
      const localizationStrings: Partial<Record<keyof BotUser, string>> = {
        notifications_enabled: 'Сповіщення',
        wake_up_time: 'Час прокидання',
        bed_time: 'Час сну',
      };
      const parseValue: (value: string | number | boolean) => string = (value: string | boolean): string =>
        isBoolean(value) ? (value ? 'Увімкнено' : 'Вимкнено') : value;
      const stringifiedUserDetails: string = Object.keys(localizationStrings)
        .filter((key: keyof BotUser): boolean => !isNil(get(user, key)))
        .map((key: keyof BotUser): string => `${get(localizationStrings, key)}: ${parseValue(get(user, key))}`)
        .join('\n');
      await ctx.editMessageText(
        `<strong>${SETTINGS.RESPONSES.MAIN.SETTINGS_NOTIFICATIONS}:</strong>\n\n<code>${stringifiedUserDetails}</code>`,
        { parse_mode: PARSE_MODE.HTML, ...keyboard }
      );
    } catch (error) {
      this.logger.error(`${ctx.text}: ${error.message}`);
    }
  }
}
