import { BotUser, BotUserDataService } from '@sue-bot-platform/api';
import { BotNotification } from '@sue-bot-platform/api';
import { QueuedNotification } from '@sue-bot-platform/api';
import { RECURRENCE_PATTERN, SCHEDULE_TYPE } from '@sue-bot-platform/api';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { addMinutes, endOfToday, getDay, isWeekend, setHours, setMinutes, startOfToday, subMinutes } from 'date-fns';
import { isNil, map } from 'lodash';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { NotificationDataService, QueuedNotificationDataService } from '@sue-bot-platform/api';

@Injectable()
export class NotificationsPreprocessorCronService {
  private notificationsQueue: Partial<QueuedNotification>[];
  constructor(
    @InjectPinoLogger() protected readonly logger: PinoLogger,
    private readonly botUserDataService: BotUserDataService,
    private readonly notificationDataService: NotificationDataService,
    private readonly queuedNotificationDataService: QueuedNotificationDataService
  ) {
    this.notificationsQueue = [];
  }

  /**
   * Computes full list of notifications to send to all users.
   * every day at 4 AM
   */
  @Cron(CronExpression.EVERY_DAY_AT_4AM)
  async processAllNotifications(): Promise<void> {
    try {
      await this.queuedNotificationDataService.drop();
      this.notificationsQueue = [];
      const users: BotUser[] = await this.botUserDataService.findWithEnabledNotifications();
      const notifications: BotNotification[] = await this.notificationDataService.findAllActive();
      for (const user of users) {
        this.addToQueue(user, notifications);
      }
      for (let i = 0; i < this.notificationsQueue.length; i += 1000) {
        const batch: Partial<QueuedNotification>[] = this.notificationsQueue.slice(i, i + 1000);
        await this.queuedNotificationDataService.bulkInsert(batch);
      }
    } catch (error) {
      this.logger.error(`Precompute All Pending Notifications: ${error.message}`);
    }
  }

  async processNotificationsByUserChatId(chatId: number): Promise<void> {
    try {
      const user: BotUser = await this.botUserDataService.findByChatId(chatId);
      if (isNil(user)) {
        throw new NotFoundException(`User with chatId: ${chatId} not found`);
      }
      await this.queuedNotificationDataService.removeAllByUserId(user.id);
      if (user.notificationsEnabled && !user.blocked) {
        const notifications: BotNotification[] = await this.notificationDataService.findAllActive();
        this.addToQueue(user, notifications);
      }
    } catch (error) {
      this.logger.error(`Precompute Users Pending Notifications: ${error.message}`);
    }
  }

  private addToQueue(user: BotUser, notifications: BotNotification[]): void {
    for (const notification of notifications) {
      if (this.shouldSendNotificationToday(notification)) {
        const sendTime: Date = this.calculateSendTime(user, notification);
        if (!isNil(sendTime)) {
          this.notificationsQueue.push({
            userId: user.id,
            notificationId: notification.id,
            sendTime,
            processed: false,
          });
        }
      }
    }
  }

  private shouldSendNotificationToday(notification: BotNotification): boolean {
    const date: Date = endOfToday();
    const day: number = getDay(date);
    const recurrencePatterns = notification.recurrencePattern;
    if (recurrencePatterns.includes(RECURRENCE_PATTERN.DAILY)) {
      return true;
    }
    if (recurrencePatterns.includes(RECURRENCE_PATTERN.WEEKDAYS) && !isWeekend(date)) {
      return true;
    }
    if (recurrencePatterns.includes(RECURRENCE_PATTERN.WEEKENDS) && isWeekend(date)) {
      return true;
    }
    const daysOfWeek: Record<number, RECURRENCE_PATTERN> = {
      0: RECURRENCE_PATTERN.SUNDAY,
      1: RECURRENCE_PATTERN.MONDAY,
      2: RECURRENCE_PATTERN.TUESDAY,
      3: RECURRENCE_PATTERN.WEDNESDAY,
      4: RECURRENCE_PATTERN.THURSDAY,
      5: RECURRENCE_PATTERN.FRIDAY,
      6: RECURRENCE_PATTERN.SATURDAY,
    };
    return recurrencePatterns.includes(daysOfWeek[day]);
  }

  private calculateSendTime(user: BotUser, notification: BotNotification): Date | null {
    if (notification.scheduleType === SCHEDULE_TYPE.EXACT_TIME && notification.time) {
      const [hours, minutes]: number[] = map(notification.time.split(':'), Number);
      let date: Date = startOfToday();
      date = setHours(date, hours);
      date = setMinutes(date, minutes);
      return date;
    }
    if (notification.scheduleType === SCHEDULE_TYPE.WAKE_UP_OFFSET && user.wakeUpTime) {
      const [hours, minutes]: number[] = map(user.wakeUpTime.split(':'), Number);
      let date: Date = startOfToday();
      date = setHours(date, hours);
      date = setMinutes(date, minutes);
      date = addMinutes(date, notification.offset);
      return date;
    }
    if (notification.scheduleType === SCHEDULE_TYPE.BED_TIME_OFFSET && user.bedTime) {
      const [hours, minutes]: number[] = map(user.bedTime.split(':'), Number);
      let date: Date = startOfToday();
      date = setHours(date, hours);
      date = setMinutes(date, minutes);
      date = subMinutes(date, notification.offset);
      return date;
    }
    return null;
  }
}

// Sample data to populate database
// export const NOTIFICATIONS: Partial<BotNotification>[] = [
//     {
//       scheduleType: SCHEDULE_TYPE.WAKE_UP_OFFSET,
//       offset: 0,
//       captions: [
//         'Прокидайся, красуне 👋',
//         'Прокидайся, дівчинко! Сьогодні буде прекрасний день:)',
//         'Прокидайся, моя Sue girl! Світ чекає на тебе:)',
//       ],
//       recurrencePattern: [RECURRENCE_PATTERN.DAILY],
//       active: true,
//     },
//     {
//       scheduleType: SCHEDULE_TYPE.WAKE_UP_OFFSET,
//       offset: 25,
//       captions: [
//         'Почни свій ранок зі склянки теплої води 💧',
//         'Спершу склянка теплої води. Потім кава, добре?',
//         'Склянка теплої води = гарний початок ранку.',
//       ],
//       recurrencePattern: [RECURRENCE_PATTERN.DAILY],
//       active: true,
//       buttons: [
//         confirmButton
//       ]
//     },
//     {
//       scheduleType: SCHEDULE_TYPE.WAKE_UP_OFFSET,
//       offset: 60,
//       captions: [
//         `Ранкова <a href='https://youtu.be/P2uKBkoveH4'>медитація</a> для спокійного дня. Спробуй :)`,
//         `Спробуй <a href='https://youtu.be/P2uKBkoveH4'>медитацію</a>. Це допомагає боротись зі стресом та тривожністю, а ще чудово розслабляє 😊`,
//         `Приділи 5 хв <a href='https://youtu.be/P2uKBkoveH4'>медитацію</a>. Вона допоможе налаштуватися на гарний день.`,
//       ],
//       recurrencePattern: [RECURRENCE_PATTERN.DAILY],
//       active: true,
//       buttons: [
//         confirmButton
//       ]
//     },
//     {
//       scheduleType: SCHEDULE_TYPE.WAKE_UP_OFFSET,
//       offset: 100,
//       captions: [
//         'Час для зарядки. Обирай під свій настрій сьогодні 👇',
//         'Яку зарядку обираєш сьогодні?)',
//         `Пам'ятаєш про зарядку? Твоє тіло тобі подякує :)`,
//       ],
//       recurrencePattern: [RECURRENCE_PATTERN.DAILY],
//       active: true,
//       buttons: [
//         {
//           text: 'Танцювальна руханка',
//           url: 'https://youtu.be/wYVUjZhU14M',
//         },
//         {
//           text: 'Зарядка-розтяжка',
//           url: 'https://youtu.be/64b4bE5FzsQ',
//         },
//         {
//           text: `М'яке пробудження`,
//           url: 'https://youtu.be/IvJmeD0YO6s',
//         },
//       ],
//     },
//     {
//       captions: [`Склянка 💧 води, пам'ятаєш?)`],
//       active: true,
//       recurrencePattern: [RECURRENCE_PATTERN.DAILY],
//       scheduleType: SCHEDULE_TYPE.WAKE_UP_OFFSET,
//       offset: 120,
//       buttons: [
//         confirmButton
//       ]
//     },
//     {
//       scheduleType: SCHEDULE_TYPE.WAKE_UP_OFFSET,
//       offset: 200,
//       captions: [
//         `Час для б'юті. Не забувай про очищення, тонізацію, зволоження.`,
//         'А тепер пінка, тонік, крем. Саме в такій послідовності.',
//         'Вмивайся правильно, а далі нанеси тонік і крем.',
//       ],
//       active: true,
//       recurrencePattern: [RECURRENCE_PATTERN.DAILY],
//     },
//     {
//       captions: ['Шкірі бракує зволоження, випий склянку водички 💧'],
//       active: true,
//       recurrencePattern: [RECURRENCE_PATTERN.DAILY],
//       scheduleType: SCHEDULE_TYPE.WAKE_UP_OFFSET,
//       offset: 240,
//       buttons: [
//         confirmButton
//       ]
//     },
//     {
//       scheduleType: SCHEDULE_TYPE.WAKE_UP_OFFSET,
//       offset: 300,
//       captions: [`Твоя афірмація на день 😊`],
//       active: true,
//       recurrencePattern: [RECURRENCE_PATTERN.DAILY],
//     },
//     {
//       captions: ['Освіжи себе склянкою води 💧'],
//       active: true,
//       recurrencePattern: [RECURRENCE_PATTERN.DAILY],
//       scheduleType: SCHEDULE_TYPE.WAKE_UP_OFFSET,
//       offset: 360,
//       buttons: [
//         confirmButton
//       ]
//     },
//     {
//       scheduleType: SCHEDULE_TYPE.EXACT_TIME,
//       time: '17:15',
//       captions: ['Не забувай, що сьогодні час карбоксі о 18:00 :)'],
//       active: true,
//       recurrencePattern: [RECURRENCE_PATTERN.SATURDAY],
//     },
//     {
//       scheduleType: SCHEDULE_TYPE.EXACT_TIME,
//       time: '18:00',
//       captions: ['Carboxy time ⏰\nГотова?'],
//       active: true,
//       recurrencePattern: [RECURRENCE_PATTERN.SATURDAY],
//     },
//     {
//       captions: ['Пересохло в горлі, випий склянку води 💧'],
//       active: true,
//       recurrencePattern: [RECURRENCE_PATTERN.DAILY],
//       scheduleType: SCHEDULE_TYPE.WAKE_UP_OFFSET,
//       offset: 480,
//       buttons: [
//         confirmButton
//       ]
//     },
//     {
//       captions: ['Час зробити ковток води 💧'],
//       active: true,
//       recurrencePattern: [RECURRENCE_PATTERN.DAILY],
//       scheduleType: SCHEDULE_TYPE.WAKE_UP_OFFSET,
//       offset: 600,
//       buttons: [
//         confirmButton
//       ]
//     },
//     {
//       captions: ['Освіжи себе склянкою води 💧'],
//       active: true,
//       recurrencePattern: [RECURRENCE_PATTERN.DAILY],
//       scheduleType: SCHEDULE_TYPE.WAKE_UP_OFFSET,
//       offset: 720,
//       buttons: [
//         confirmButton
//       ]
//     },
//     {
//       scheduleType: SCHEDULE_TYPE.BED_TIME_OFFSET,
//       offset: 200,
//       captions: ['Відпочинь від соцмереж. Приділи час собі 😊', 'Телефон в сторону, час для себе настав.', 'Час відкласти телефон'],
//       active: true,
//       recurrencePattern: [RECURRENCE_PATTERN.DAILY],
//     },
//     {
//       scheduleType: SCHEDULE_TYPE.BED_TIME_OFFSET,
//       offset: 140,
//       captions: [
//         `<a href='https://youtu.be/g_tea8ZNk5A'>Розтяжка</a> для розслаблення. Те, що треба ввечері 😌`,
//         `<a href='https://youtu.be/g_tea8ZNk5A'>Порозтягуємось</a>?`,
//         `Вечірня <a href='https://youtu.be/g_tea8ZNk5A'>розтяжка</a> вже чекає на тебе 😊`,
//       ],
//       active: true,
//       recurrencePattern: [RECURRENCE_PATTERN.DAILY],
//     },
//     {
//       scheduleType: SCHEDULE_TYPE.BED_TIME_OFFSET,
//       offset: 60,
//       captions: [
//         'Потурбуйся про себе. Змий всю косметику з обличчя та вмийся. Не забувай про 3 кроки догляду.',
//         'Вечірні ритуали за розкладом. Час змити декоративну косметику, вмитись, а далі тонік + крем.',
//         'Змивай декоративку і не забудь про правильний вечірній догляд',
//       ],
//       active: true,
//       recurrencePattern: [RECURRENCE_PATTERN.DAILY],
//     },
//     {
//       scheduleType: SCHEDULE_TYPE.BED_TIME_OFFSET,
//       offset: 20,
//       captions: [
//         'Подякуй цьому дню та заплануй наступний.',
//         'Правда ж день був чудовим? Що було класного? Згадай:)',
//         'У тебе був чудовий день? Чому?',
//       ],
//       active: true,
//       recurrencePattern: [RECURRENCE_PATTERN.DAILY],
//     },
//     {
//       scheduleType: SCHEDULE_TYPE.BED_TIME_OFFSET,
//       offset: 0,
//       captions: ['Відпочивай, красуне!', 'Добраніч, прекрасна дівчинко:)', 'Час вкладатись спатки.'],
//       active: true,
//       recurrencePattern: [RECURRENCE_PATTERN.DAILY],
//     },
//   ];

// export const WATER_NOTIFICATIONS: Partial<BotNotification>[] = [
//       {
//         scheduleType: SCHEDULE_TYPE.WAKE_UP_OFFSET,
//         offset: 30,
//         captions: [
//           'Почни свій ранок зі склянки теплої води 💧',
//           'Спершу склянка теплої води. Потім кава, добре?',
//           'Склянка теплої води = гарний початок ранку.',
//         ],
//         recurrencePattern: [RECURRENCE_PATTERN.DAILY],
//         active: true,
//         buttons: [
//           confirmButton
//         ]
//       },
//       {
//         captions: [`Склянка 💧 води, пам'ятаєш?)`],
//         active: true,
//         recurrencePattern: [RECURRENCE_PATTERN.DAILY],
//         scheduleType: SCHEDULE_TYPE.WAKE_UP_OFFSET,
//         offset: 120,
//         buttons: [
//           confirmButton
//         ]
//       },
//       {
//         captions: ['Шкірі бракує зволоження, випий склянку водички 💧'],
//         active: true,
//         recurrencePattern: [RECURRENCE_PATTERN.DAILY],
//         scheduleType: SCHEDULE_TYPE.WAKE_UP_OFFSET,
//         offset: 240,
//         buttons: [
//           confirmButton
//         ]
//       },
//       {
//         captions: ['Освіжи себе склянкою води 💧'],
//         active: true,
//         recurrencePattern: [RECURRENCE_PATTERN.DAILY],
//         scheduleType: SCHEDULE_TYPE.WAKE_UP_OFFSET,
//         offset: 360,
//         buttons: [
//           confirmButton
//         ]
//       },
//       {
//         captions: ['Пересохло в горлі, випий склянку води 💧'],
//         active: true,
//         recurrencePattern: [RECURRENCE_PATTERN.DAILY],
//         scheduleType: SCHEDULE_TYPE.WAKE_UP_OFFSET,
//         offset: 480,
//         buttons: [
//           confirmButton
//         ]
//       },
//       {
//         captions: ['Час зробити ковток води 💧'],
//         active: true,
//         recurrencePattern: [RECURRENCE_PATTERN.DAILY],
//         scheduleType: SCHEDULE_TYPE.WAKE_UP_OFFSET,
//         offset: 600,
//         buttons: [
//           confirmButton
//         ]
//       },
//       {
//         captions: ['Освіжи себе склянкою води 💧'],
//         active: true,
//         recurrencePattern: [RECURRENCE_PATTERN.DAILY],
//         scheduleType: SCHEDULE_TYPE.WAKE_UP_OFFSET,
//         offset: 720,
//         buttons: [
//           confirmButton
//         ]
//       }
//     ];
