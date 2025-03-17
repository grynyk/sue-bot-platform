import { Action, Ctx, InjectBot, Scene } from 'nestjs-telegraf';
import { Markup, Telegraf } from 'telegraf';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { InlineKeyboardMarkup, Message } from '@telegraf/types';
import { SceneNavigation, SceneStateService } from '@shared/scene-navigation';
import { NAVIGATION_CALLBACK } from '@models/navigation.model';
import { SCENE_ID, SceneContext } from '@models/scenes.model';
import { isBotCommand } from '@utils/command.utils';
import { BotUser, BotUserDataService } from '@modules/bot-user-data';
import {
  getSettingsInitialKeyboard,
  getSettingsNotificationsKeyboard,
  getSettingsNotificationTimeKeyboard,
} from './utils/keyboard.factory';
import { SettingsSceneContextType } from './models/settings.model';
import { get, isBoolean, isNil } from 'lodash';
import { SETTINGS } from './constants/settings.constant';
import { PARSE_MODE } from '@models/tg.model';
import { NotificationsQueueService } from '../../services/notifications-queue.service';

@Scene(SCENE_ID.SETTINGS)
export class SettingsScene extends SceneNavigation {
  constructor(
    @InjectBot() protected readonly bot: Telegraf,
    @InjectPinoLogger() protected readonly logger: PinoLogger,
    protected readonly stateService: SceneStateService,
    private readonly botUserDataService: BotUserDataService,
    private readonly notificationsQueueService: NotificationsQueueService,
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
        ctx.answerCbQuery();
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
        this.onToggleNotifications(ctx, false);
        return;
      }
      if (callbackData === SETTINGS.CALLBACKS.NOTIFICATIONS.ENABLE) {
        this.onToggleNotifications(ctx, true);
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
      const wakeUpTime: string = ctx.match[1];
      const chatId: number = ctx.from.id;
      await this.botUserDataService.update(ctx.from.id, { wakeUpTime });
      this.stateService.removeLastCallback();
      await this.onNotificationsSettings(ctx);
      await this.notificationsQueueService.precomputeUserPendingNotifications(chatId);
    } catch (error) {
      this.logger.error(`${ctx.text}: ${error.message}`);
    }
  }

  @Action(/^BED_TIME_(([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9])/)
  async onSetBedTimeCallback(@Ctx() ctx: SceneContext): Promise<void> {
    try {
      const bedTime: string = ctx.match[1];
      const chatId: number = ctx.from.id;
      await this.botUserDataService.update(ctx.from.id, { bedTime });
      this.stateService.removeLastCallback();
      await this.onNotificationsSettings(ctx);
      await this.notificationsQueueService.precomputeUserPendingNotifications(chatId);
    } catch (error) {
      this.logger.error(`${ctx.text}: ${error.message}`);
    }
  }

  private async onToggleNotifications(ctx: SceneContext, notificationsEnabled = true): Promise<void> {
    try {
      const chatId: number = ctx.from.id;
      await this.botUserDataService.update(chatId, { notificationsEnabled });   
      await this.onNotificationsSettings(ctx);
      await this.notificationsQueueService.precomputeUserPendingNotifications(chatId);
    } catch (error) {
      this.logger.error(`${ctx.text}: ${error.message}`);
    }
  }

  private async onSetWakeUpTime(ctx: SceneContext): Promise<void> {
    try {
      const callbackData: SettingsSceneContextType = get(ctx.callbackQuery, 'data') as SettingsSceneContextType;
      this.stateService.storeCallback(callbackData);
      const keyboard: Markup.Markup<InlineKeyboardMarkup> = getSettingsNotificationTimeKeyboard(6, 10, 'WAKE_UP_TIME');
      await ctx.editMessageText('Оберіть час прокидання:', keyboard);
    } catch (error) {
      this.logger.error(`${ctx.text}: ${error.message}`);
    }
  }

  private async onSetBedTime(ctx: SceneContext): Promise<void> {
    try {
      const callbackData: SettingsSceneContextType = get(ctx.callbackQuery, 'data') as SettingsSceneContextType;
      this.stateService.storeCallback(callbackData);
      const keyboard: Markup.Markup<InlineKeyboardMarkup> = getSettingsNotificationTimeKeyboard(22, 24, 'BED_TIME');
      await ctx.editMessageText('Оберіть час сну:', keyboard);
    } catch (error) {
      this.logger.error(`${ctx.text}: ${error.message}`);
    }
  }

  private async onNotificationsSettings(ctx: SceneContext): Promise<void> {
    try {
      ctx.answerCbQuery();
      const user: BotUser = await this.botUserDataService.findByChatId(ctx.from.id);
      const keyboard: Markup.Markup<InlineKeyboardMarkup> = getSettingsNotificationsKeyboard(user.notificationsEnabled);
      const content: string = this.getUserNotificationSettingsDetails(user);
      await ctx.editMessageText(
        `<strong>${SETTINGS.RESPONSES.MAIN.SETTINGS_NOTIFICATIONS}:</strong>\n\n<code>${content}</code>`,
        { parse_mode: PARSE_MODE.HTML, ...keyboard }
      );
    } catch (error) {
      this.logger.error(`${ctx.text}: ${error.message}`);
    }
  }

  private getUserNotificationSettingsDetails(user: BotUser): string {
    const LOCALIZATION_STRINGS: Partial<Record<keyof BotUser, string>> = {
      notificationsEnabled: 'Сповіщення',
      wakeUpTime: 'Час прокидання',
      bedTime: 'Час сну',
    };
    const parseValue: (value: unknown) => string = (value: string | boolean): string =>
      isBoolean(value) ? (value ? 'Увімкнено' : 'Вимкнено') : value;
    const stringifiedDetails: string = Object.keys(LOCALIZATION_STRINGS)
      .filter((key: keyof BotUser): boolean => !isNil(get(user, key)))
      .map((key: keyof BotUser): string => `${get(LOCALIZATION_STRINGS, key)}: ${parseValue(get(user, key))}`)
      .join('\n');
    return stringifiedDetails;
  }
}
