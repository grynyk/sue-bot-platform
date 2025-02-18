import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';
import { NAVIGATION_CALLBACK, NAVIGATION_ICON } from '../enums';
import { NotificationsManagerMarkup } from './models';

function generateInlineCallbackButtonsBasedOnTime(
  times: string[],
  callback: string
): InlineKeyboardButton.CallbackButton[] {
  return times.map(
    (time: string): InlineKeyboardButton.CallbackButton => ({
      text: time,
      callback_data: `${callback}${time.replace(':', '_')}`,
    })
  );
}

const wakeTimeOptions: string[] = [
  '06:00',
  '06:10',
  '06:20',
  '06:30',
  '06:40',
  '06:50',
  '07:00',
  '07:10',
  '07:20',
  '07:30',
  '07:40',
  '07:50',
  '08:00',
  '08:10',
  '08:20',
  '08:30',
  '08:40',
  '08:50',
  '09:00',
  '09:10',
  '09:20',
  '09:30',
  '09:40',
  '09:50',
];

const bedTimeOptions: string[] = [
  '22:00',
  '22:10',
  '22:20',
  '22:30',
  '22:40',
  '22:50',
  '23:00',
  '23:10',
  '23:20',
  '23:30',
  '23:40',
  '23:50',
];

export const notificationsManagerMarkup: NotificationsManagerMarkup = {
  day_time: (isNotificationsEnabled: boolean) => [
    isNotificationsEnabled
      ? [
          {
            text: 'Вимкнути Сповіщення',
            callback_data: NAVIGATION_CALLBACK.NOTIFICATIONS_OFF,
          },
        ]
      : [
          {
            text: 'Увімкнути Сповіщення',
            callback_data: NAVIGATION_CALLBACK.NOTIFICATIONS_ON,
          },
        ],
    [
      {
        text: 'Встановити час прокидання',
        callback_data: 'notifications_wake_up_time',
      },
    ],
    [{ text: 'Встановити час сну', callback_data: 'notifications_bed_time' }],
    [{ text: NAVIGATION_ICON.CLOSE, callback_data: NAVIGATION_CALLBACK.CLOSE }],
  ],
  wake_up_time: [
    [
      ...generateInlineCallbackButtonsBasedOnTime(
        wakeTimeOptions.slice(0, 6),
        'notifications_wake_up_time_'
      ),
    ],
    [
      ...generateInlineCallbackButtonsBasedOnTime(
        wakeTimeOptions.slice(6, 12),
        'notifications_wake_up_time_'
      ),
    ],
    [
      ...generateInlineCallbackButtonsBasedOnTime(
        wakeTimeOptions.slice(12, 18),
        'notifications_wake_up_time_'
      ),
    ],
    [
      ...generateInlineCallbackButtonsBasedOnTime(
        wakeTimeOptions.slice(18, 24),
        'notifications_wake_up_time_'
      ),
    ],
    [
      {
        text: NAVIGATION_ICON.BACK,
        callback_data: NAVIGATION_CALLBACK.NOTIFICATIONS_BACK,
      },
    ],
    [{ text: NAVIGATION_ICON.CLOSE, callback_data: NAVIGATION_CALLBACK.CLOSE }],
  ],
  bed_time: [
    [
      ...generateInlineCallbackButtonsBasedOnTime(
        bedTimeOptions.slice(0, 4),
        'notifications_bed_time_'
      ),
    ],
    [
      ...generateInlineCallbackButtonsBasedOnTime(
        bedTimeOptions.slice(4, 8),
        'notifications_bed_time_'
      ),
    ],
    [
      ...generateInlineCallbackButtonsBasedOnTime(
        bedTimeOptions.slice(8, 12),
        'notifications_bed_time_'
      ),
    ],
    [
      ...generateInlineCallbackButtonsBasedOnTime(
        bedTimeOptions.slice(12, 16),
        'notifications_bed_time_'
      ),
    ],
    [
      {
        text: NAVIGATION_ICON.BACK,
        callback_data: NAVIGATION_CALLBACK.NOTIFICATIONS_BACK,
      },
    ],
    [{ text: NAVIGATION_ICON.CLOSE, callback_data: NAVIGATION_CALLBACK.CLOSE }],
  ],
};
