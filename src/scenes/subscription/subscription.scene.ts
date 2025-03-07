import { Action, Ctx, InjectBot, Scene, SceneEnter } from 'nestjs-telegraf';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { SCENE_ID, SceneContext } from '@models/scenes.model';
import { BotCommand, Message, ReplyKeyboardMarkup } from 'typegram';
import { compact, isNil } from 'lodash';
import { Markup, Telegraf } from 'telegraf';
import { BotUser, BotUserDataService } from '@modules/bot-user-data';
import { toZonedTime } from 'date-fns-tz';
import { format } from 'date-fns';
import { PARSE_MODE } from '@models/tg.model';
import { Observable, switchMap, tap, timer } from 'rxjs';
import { SUBSCRIPTION_CALLBACK } from './enums/subscription.enum';
import { NAVIGATION_CALLBACK, NAVIGATION_ICON } from '@models/navigation.model';

const parse_mode = PARSE_MODE.HTML;

@Scene(SCENE_ID.SUBSCRIPTION)
export class SubscriptionScene {
  date: Date;

  constructor(
    @InjectBot() protected readonly bot: Telegraf,
    @InjectPinoLogger() protected readonly logger: PinoLogger,
    private readonly botUserDataService: BotUserDataService
  ) {
    this.date = toZonedTime(new Date(), process.env.TZ);
  }

  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: SceneContext): Promise<void> {
    try {
      const commands: BotCommand[] = await ctx.telegram.getMyCommands();
      const commandsKeyboard: Markup.Markup<ReplyKeyboardMarkup> = Markup.keyboard(
        compact(commands.map((command: BotCommand) => Markup.button.text(`/${command.command}`)))
      ).resize();
      const name: string = ctx.from.first_name || ctx.from.username || '';
      const user: BotUser = await this.botUserDataService.findOne(ctx.from.id);
      if (!isNil(user)) {
        await ctx.reply(`Привіт, ${name}!\nВи вже насолоджуєтесь магією звички 😉`, {
          parse_mode,
          ...commandsKeyboard.resize(),
        });
        return;
      }
      await this.botUserDataService.create({
        ...ctx.from,
        timestamp: format(this.date, `yyyy-MM-dd'T'HH:mm:ss`),
      });
      await ctx.reply(`Привіт, ${name}!\nЯ бот Sue(С'ю) і я буду про тебе піклуватись 😊`, {
        parse_mode,
        ...Markup.inlineKeyboard([Markup.button.callback(`Натисни та розпочни 'Магію звички'`, SUBSCRIPTION_CALLBACK.SUBSCRIBE)]),
      });
    } catch (error) {
      this.logger.error(`${ctx.text}: ${error.message}`);
    }
  }

  @Action(SUBSCRIPTION_CALLBACK.SUBSCRIBE)
  async onRecipe(@Ctx() ctx: SceneContext): Promise<void> {
    try {
      await ctx.answerCbQuery();
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
                Markup.inlineKeyboard([Markup.button.callback(NAVIGATION_ICON.CONFIRM, NAVIGATION_CALLBACK.CONFIRM)])
              )
          ),
          tap((): void => {
            ctx.scene.leave();
          })
        )
        .subscribe();
    } catch (error) {
      this.logger.error(`${ctx.text}: ${error.message}`);
    }
  }
}
