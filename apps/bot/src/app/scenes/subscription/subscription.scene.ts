import { Action, Ctx, InjectBot, Scene, SceneEnter } from 'nestjs-telegraf';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { SCENE_ID, SceneContext, PARSE_MODE } from '../../models';
import { BotCommand, Message, ReplyKeyboardMarkup } from 'typegram';
import { compact, isNil, omit } from 'lodash';
import { Markup, Telegraf } from 'telegraf';
import { BotUser, BotUserDataService, UpdateBotUserDto } from '@sue-bot-platform/api';
import { format, startOfToday } from 'date-fns';
import { Observable, switchMap, tap, timer } from 'rxjs';
import { SUBSCRIPTION_CALLBACK } from './enums/subscription.enum';
import { confirmButtonKeyboard } from '../../utils/keyboard.utils';
import { NotificationsPreprocessorCronService } from '../../crons/notifications-preprocessor-cron.service';

const parse_mode = PARSE_MODE.HTML;

@Scene(SCENE_ID.SUBSCRIPTION)
export class SubscriptionScene {
  date: Date;

  constructor(
    @InjectBot() protected readonly bot: Telegraf,
    @InjectPinoLogger() protected readonly logger: PinoLogger,
    private readonly botUserDataService: BotUserDataService,
    private readonly notificationsPreprocessorCronService: NotificationsPreprocessorCronService
  ) {
    this.date = startOfToday();
  }

  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: SceneContext): Promise<void> {
    try {
      const commands: BotCommand[] = await ctx.telegram.getMyCommands();
      const commandsKeyboard: Markup.Markup<ReplyKeyboardMarkup> = Markup.keyboard(
        compact(commands.map((command: BotCommand) => Markup.button.text(`/${command.command}`)))
      ).resize();
      const name: string = ctx.from.first_name || ctx.from.username || '';
      const chatId: number = ctx.from.id;
      const user: BotUser = await this.botUserDataService.findByChatId(chatId);
      if (!isNil(user)) {
        await ctx.reply(`Привіт, ${name}!\nВи вже насолоджуєтесь магією звички 😉`, {
          parse_mode,
          ...commandsKeyboard.resize(),
        });
        await this.botUserDataService.update(chatId, { blocked: false });
        return;
      }
      const updateBotUserDto: UpdateBotUserDto = omit(ctx.from, 'id');
      await this.botUserDataService.create({
        ...updateBotUserDto,
        chatId,
        timestamp: format(this.date, `yyyy-MM-dd'T'HH:mm:ss`),
      });
      await ctx.reply(`Привіт, ${name}!\nЯ бот Sue(С'ю) і я буду про тебе піклуватись 😊`, {
        parse_mode,
        ...Markup.inlineKeyboard([Markup.button.callback(`Натисни та розпочни 'Магію звички'`, SUBSCRIPTION_CALLBACK.SUBSCRIBE)]),
      });
      await this.notificationsPreprocessorCronService.processNotificationsByUserChatId(chatId);
    } catch (error) {
      this.logger.error(`${ctx.text} onSceneEnter(...): ${error.message}`);
    }
  }

  @Action(SUBSCRIPTION_CALLBACK.SUBSCRIBE)
  async onSubscribe(@Ctx() ctx: SceneContext): Promise<void> {
    try {
      ctx.answerCbQuery();
      await ctx.editMessageReplyMarkup(undefined);
      ctx.reply('Я буду надсилати тобі сповіщення протягом дня\n\n<i>*Налаштувати сповіщення можна за допомогою команди /settings</i>', {
        parse_mode,
      });
      timer(1000)
        .pipe(
          switchMap((): Promise<Message> => ctx.reply('Давай розпочнемо зі склянки води 💧')),
          switchMap((): Observable<number> => timer(2000)),
          switchMap(
            (): Promise<Message> =>
              ctx.reply(
                'Випий 200мл води 💧',
                confirmButtonKeyboard
              )
          ),
          tap((): void => {
            ctx.scene.leave();
          })
        )
        .subscribe();
    } catch (error) {
      this.logger.error(`${ctx.text} onSubscribe(...): ${error.message}`);
    }
  }
}
