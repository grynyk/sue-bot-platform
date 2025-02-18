import { isNil } from 'lodash';
import { Context } from 'telegraf/typings/context';
import {
  buttonsMarkup,
  commandsMarkup,
  interestingMarkup,
  notificationsManagerMarkup,
  recipesMarkup,
  skinTestMarkup,
} from '../shared/markups';
import { UsersDatabaseMiddleware } from '../middlewares';
import { CommandsControllerModel } from '../models';
import { skinTestState } from '../shared/state';
import { TgUtils } from '../shared/utils';
import { MESSAGE_DELIVERY_TYPE, PARSE_MODE } from '../shared/enums';
import { BotUser } from '../middlewares/database/models/users.model';
import { NO_INSTANCE_ERROR } from '../shared/error-messages';

export const CommandsController: CommandsControllerModel = {
  async start(ctx: Context): Promise<void> {
    try {
      const existingUser: BotUser = await UsersDatabaseMiddleware.getById(
        String(ctx.from.id)
      );
      if (!isNil(existingUser)) {
        await ctx.reply(
          `Привіт ${
            isNil(ctx.from.first_name) ? '' : ctx.from.first_name
          }, ви вже насолоджуєтесь магією звички 😽 :)`
        );
        await ctx.telegram.sendMessage(ctx.chat.id, `Доступні команди:`, {
          reply_markup: {
            keyboard: commandsMarkup,
            one_time_keyboard: true,
            resize_keyboard: true,
            selective: true,
          },
        });
        return;
      }
      await UsersDatabaseMiddleware.createOne(ctx.from);
      const messageText: string = `Привіт ${
        isNil(ctx.from.first_name) ? '' : ctx.from.first_name
      }, я бот Sue(С'ю) і я буду про тебе піклуватись 😊`;
      await TgUtils.deliverMessage(
        ctx,
        MESSAGE_DELIVERY_TYPE.SEND_NEW,
        messageText,
        {
          markup: buttonsMarkup.start(),
        }
      );
    } catch (e: unknown) {
      throw new Error(`${e}`);
    }
  },
  async stats(ctx: Context): Promise<void> {
    try {
      const usersNumber: number =
        await UsersDatabaseMiddleware.getTotalNumber();
      const activeUsersTodayNumber: number =
        await UsersDatabaseMiddleware.getAllActiveToday();
      const usersDoneTasksTodayNumber: number =
        await UsersDatabaseMiddleware.getAllDoneTasksToday();
      const newUsersDiff: number =
        await UsersDatabaseMiddleware.getRecentRegisteredDiff();
      const usersWithDisabledNotifications: number =
        await UsersDatabaseMiddleware.getAllWithDisabledNotifications();
      const usersWithChangedNotificationsTime: number =
        await UsersDatabaseMiddleware.getAllWithChangedNotificationsTime();
      const usersWhoCompletedSkinTest: number =
        await UsersDatabaseMiddleware.getAllWhoCompletedSkinTest();
      if (
        isNil(usersNumber) ||
        isNil(newUsersDiff) ||
        isNil(usersWithDisabledNotifications) ||
        isNil(usersWithChangedNotificationsTime) ||
        isNil(usersWhoCompletedSkinTest)
      ) {
        return;
      }
      ctx.reply(
        `<pre>Всіх користувачів</pre>:\t\t${usersNumber}\n<pre>За останню добу</pre>:\t\t${newUsersDiff}\n<pre>З вимкненими сповіщеннями</pre>:\t\t${usersWithDisabledNotifications}\n<pre>Зі зміненим часом прокидання/сну</pre>:\t\t${usersWithChangedNotificationsTime}\n<pre>Пройшли тест(від 13.10.21)</pre>:\t\t${usersWhoCompletedSkinTest}\n<pre>Активних користувачів сьогодні</pre>:\t\t${activeUsersTodayNumber}\n<pre>Натиснули хоча б на одну кнопку</pre>:\t\t${usersDoneTasksTodayNumber}\n`,
        {
          parse_mode: PARSE_MODE.HTML,
        }
      );
    } catch (e: unknown) {
      throw new Error(`${e}`);
    }
  },
  async notificationsManager(ctx: Context): Promise<void> {
    try {
      if (!ctx.chat) {
        throw new SyntaxError(NO_INSTANCE_ERROR('chat'));
      }
      const user: BotUser = await UsersDatabaseMiddleware.getById(
        String(ctx.from.id)
      );
      if (isNil(user)) {
        return;
      }
      const wakeUpTime: string = isNil(user.wakeUpTime)
        ? 'не встановлено'
        : user.wakeUpTime;
      const bedTime: string = isNil(user.bedTime)
        ? 'не встановлено'
        : user.bedTime;
      const notificationsFlag: string = isNil(user.notificationsEnabled)
        ? 'немає інформації'
        : user.notificationsEnabled
        ? 'увімкнено'
        : 'вимкнено';
      await TgUtils.deliverMessage(
        ctx,
        MESSAGE_DELIVERY_TYPE.SEND_NEW,
        `Сповіщення <strong>${notificationsFlag}</strong>\n\n<strong>Встановлений час:</strong>\nПрокидання: ${wakeUpTime}\nСон: ${bedTime}`,
        {
          parseMode: PARSE_MODE.HTML,
          markup: notificationsManagerMarkup.day_time(
            user.notificationsEnabled
          ),
        }
      );
    } catch (e: unknown) {
      throw new Error(`${e}`);
    }
  },
  async skinTest(ctx: Context): Promise<void> {
    try {
      if (!ctx.chat) {
        throw new SyntaxError(NO_INSTANCE_ERROR('chat'));
      }
      const firstTestQuestionMarkupKey: string = 'KNOWN_TYPE';
      skinTestState.addCallbackToPath(firstTestQuestionMarkupKey);
      skinTestState.clearRecentResultMessage();
      await TgUtils.deliverMessage(
        ctx,
        MESSAGE_DELIVERY_TYPE.SEND_NEW,
        `${ctx.from.first_name}, чи знаєш ти свій тип шкіри?`,
        { markup: skinTestMarkup.KNOWN_TYPE }
      );
    } catch (e: unknown) {
      throw new Error(`${e}`);
    }
  },
  async recipes(ctx: Context): Promise<void> {
    try {
      if (!ctx.chat) {
        throw new SyntaxError(NO_INSTANCE_ERROR('chat'));
      }
      await TgUtils.deliverMessage(
        ctx,
        MESSAGE_DELIVERY_TYPE.SEND_NEW,
        'Рецепти:',
        { markup: recipesMarkup }
      );
    } catch (e: unknown) {
      throw new Error(`${e}`);
    }
  },
  async interesting(ctx: Context): Promise<void> {
    try {
      if (!ctx.chat) {
        throw new SyntaxError(NO_INSTANCE_ERROR('chat'));
      }
      await TgUtils.deliverMessage(
        ctx,
        MESSAGE_DELIVERY_TYPE.SEND_NEW,
        'Корисна інформація:',
        {
          markup: interestingMarkup,
        }
      );
    } catch (e: unknown) {
      throw new Error(`${e}`);
    }
  },
};
