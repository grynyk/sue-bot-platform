import { Telegraf } from 'telegraf';
import Context from 'telegraf/typings/context';
import 'dotenv/config';
import { StoragesInit, UsersDatabaseMiddleware } from './middlewares';
import { allCommandsToHandle } from './static/commands';
import { TgCommandDataItem } from './models';
import { allCallbacksToListen } from './static/callbacks';
import { CallbacksController, PhrasesController } from './controllers';
import { allPhrasesToHear } from './static/phrases';
import { EnvUtils } from './shared/utils';
import { BOT_URL } from './shared/api-path';

const BOT_TOKEN: string = process.env.BOT_TOKEN;
const bot: Telegraf = new Telegraf(BOT_TOKEN);

/**
 * Middleware to handle all bot actions and pass further.
 * @param {Context} ctx - The Telegraf context.
 * @param {() => Promise<void>} next - The next middleware function.
 * @returns {Promise<void>}
 */
bot.use(async (ctx: Context, next: () => Promise<void>): Promise<void> => {
  await UsersDatabaseMiddleware.updateBasicInfo(ctx.from);
  await next();
});

/**
 * Handle all bot commands.
 * Bot reacts to specific commands which start with '/'.
 */
allCommandsToHandle.forEach((command: TgCommandDataItem): void => {
  bot.command(command.name, command.callbackFn);
});

/**
 * Handle all callbacks.
 * Bot reacts to inline keyboard responses.
 */
allCallbacksToListen.forEach((callback: string): void => {
  CallbacksController.listenToKeyboardCallback(bot, callback);
});

/**
 * Handle all phrases.
 * Bot reacts to specific phrases typed by user.
 */
allPhrasesToHear.forEach((phrase: string): void => {
  PhrasesController.listenToPhrase(bot, phrase);
});

/**
 * Initialize the database.
 * Creation of database tables if they don't exist.
 */
StoragesInit();

/**
 * Initialize the bot server depending on the environment.
 */
if (EnvUtils.isDev()) {
  bot.launch();
} else {
  const port: number = process.env.PORT ? Number(process.env.PORT) : 5000;
  const URL: string =
    process.env.HEROKU_URL ||
    (EnvUtils.isProd() ? BOT_URL.HEROKU_PROD : BOT_URL.HEROKU_STAGING);
  bot.launch({
    webhook: {
      domain: `${URL}${BOT_TOKEN}`,
      port,
    },
  });
}

/**
 * Gracefully stop the bot.
 */
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
