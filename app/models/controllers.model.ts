import { Moment } from 'moment';
import Context from 'telegraf/typings/context';
import { Telegraf } from 'telegraf/typings/telegraf';
import { NotificationMessage } from './notifications.model';
import { SkinTestDataItem, SkinTestResultData } from './skin-test.model';
import { SendMessageOptions, TgMessageHttpResponse } from './tg.model';
import { BotUser } from '../middlewares/database/models/users.model';
import { StaticDataItem } from '../static/models';
import { SkinTestResultInfoKeys } from '../shared/enums';

export interface BroadcastControllerModel {
  sendMessageToUser: (
    userId: string | number,
    messageOptions: Partial<SendMessageOptions>,
    botToken: string
  ) => Promise<TgMessageHttpResponse>;
  sendToAllUsers: (
    botToken: string,
    options: SendMessageOptions
  ) => Promise<void>;
  sendScheduledNotificationToAllUsers: (
    currentTimestamp: Moment,
    botToken: string
  ) => Promise<void>;
}

export interface CallbacksControllerModel {
  listenToKeyboardCallback: (bot: Telegraf, callback: string) => void;
}

export interface CommandsControllerModel {
  start: (ctx: Context) => Promise<void>;
  stats: (ctx: Context) => Promise<void>;
  interesting: (ctx: Context) => Promise<void>;
  recipes: (ctx: Context) => Promise<void>;
  notificationsManager: (ctx: Context) => Promise<void>;
  skinTest: (ctx: Context) => Promise<void>;
}

export interface InterestingControllerModel {
  callbacksHandler: (ctx: Context, callback: string) => Promise<void>;
}

export interface MessagesControllerModel {
  deleteAll: (botToken: string) => Promise<void>;
}

export interface NotificationsControllerModel {
  getScheduledNotification: (
    currentTimestamp: Moment,
    user: BotUser
  ) => NotificationMessage;
  callbacksHandler: (ctx: Context, callback: string) => Promise<void>;
}

export interface RecipesControllerModel {
  callbacksHandler: (ctx: Context, callback: string) => Promise<void>;
}

export interface SkinTestControllerModel {
  getSkinTestResult: (callback: string) => SkinTestDataItem;
  getSkinTestResultInfo: (
    callback: string,
    key: SkinTestResultInfoKeys
  ) => SkinTestResultData;
  sendComplexSizeQuestion: (ctx: Context, callback: string) => Promise<void>;
  sendSkinTestResultLinks: (ctx: Context, callback: string) => Promise<void>;
  sendSkinTestResultInfo: (
    ctx: Context,
    resultData: SkinTestResultData,
    isBuyButton: boolean
  ) => Promise<void>;
  sendNextQuestion: (
    ctx: Context,
    item: StaticDataItem,
    callback: string
  ) => Promise<void>;
  sendPreviousQuestion: (ctx: Context) => void;
  callbacksHandler: (ctx: Context, callback: string) => Promise<void>;
}

export interface PhrasesControllerModel {
  listenToPhrase: (bot: Telegraf, phrase: string) => void;
}
