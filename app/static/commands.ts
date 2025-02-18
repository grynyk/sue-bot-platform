import { Context } from 'telegraf/typings/context';
import { CommandsController } from '../controllers';
import { TgCommandDataItem } from '../models';

export const allCommandsToHandle: TgCommandDataItem[] = [
  {
    name: 'start',
    callbackFn: (ctx: Context) => CommandsController.start(ctx),
  },
  {
    name: 'stats',
    callbackFn: (ctx: Context) => CommandsController.stats(ctx),
  },
  {
    name: 'skintest',
    callbackFn: (ctx: Context) => CommandsController.skinTest(ctx),
  },
  {
    name: 'recipes',
    callbackFn: (ctx: Context) => CommandsController.recipes(ctx),
  },
  {
    name: 'interesting',
    callbackFn: (ctx: Context) => CommandsController.interesting(ctx),
  },
  {
    name: 'notifications_manager',
    callbackFn: (ctx: Context) => CommandsController.notificationsManager(ctx),
  },
];
