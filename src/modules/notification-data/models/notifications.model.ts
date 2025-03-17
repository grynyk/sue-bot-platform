import { BotNotification } from '../entities/bot-notification.entity';
import { confirmButton } from '@utils/keyboard.utils';

export enum RECURRENCE_PATTERN {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
  DAILY = 'DAILY',
  WEEKDAYS = 'WEEKDAYS',
  WEEKENDS = 'WEEKENDS',
}

export enum SCHEDULE_TYPE {
  EXACT_TIME = 'EXACT_TIME',
  WAKE_UP_OFFSET = 'WAKE_UP_OFFSET',
  BED_TIME_OFFSET = 'BED_TIME_OFFSET'
}

export const NOTIFICATIONS: Partial<BotNotification>[] = [
  {
    scheduleType: SCHEDULE_TYPE.WAKE_UP_OFFSET,
    offset: 0,
    captions: [
      'Прокидайся, красуне 👋',
      'Прокидайся, дівчинко! Сьогодні буде прекрасний день:)',
      'Прокидайся, моя Sue girl! Світ чекає на тебе:)',
    ],
    recurrencePattern: [RECURRENCE_PATTERN.DAILY],
    active: true,
  },
  {
    scheduleType: SCHEDULE_TYPE.WAKE_UP_OFFSET,
    offset: 25,
    captions: [
      'Почни свій ранок зі склянки теплої води 💧',
      'Спершу склянка теплої води. Потім кава, добре?',
      'Склянка теплої води = гарний початок ранку.',
    ],
    recurrencePattern: [RECURRENCE_PATTERN.DAILY],
    active: true,
    buttons: [
      confirmButton
    ]
  },
  {
    scheduleType: SCHEDULE_TYPE.WAKE_UP_OFFSET,
    offset: 60,
    captions: [
      `Ранкова <a href='https://youtu.be/P2uKBkoveH4'>медитація</a> для спокійного дня. Спробуй :)`,
      `Спробуй <a href='https://youtu.be/P2uKBkoveH4'>медитацію</a>. Це допомагає боротись зі стресом та тривожністю, а ще чудово розслабляє 😊`,
      `Приділи 5 хв <a href='https://youtu.be/P2uKBkoveH4'>медитацію</a>. Вона допоможе налаштуватися на гарний день.`,
    ],
    recurrencePattern: [RECURRENCE_PATTERN.DAILY],
    active: true,
    buttons: [
      confirmButton
    ]
  },
  {
    scheduleType: SCHEDULE_TYPE.WAKE_UP_OFFSET,
    offset: 100,
    captions: [
      'Час для зарядки. Обирай під свій настрій сьогодні 👇',
      'Яку зарядку обираєш сьогодні?)',
      `Пам'ятаєш про зарядку? Твоє тіло тобі подякує :)`,
    ],
    recurrencePattern: [RECURRENCE_PATTERN.DAILY],
    active: true,
    buttons: [
      {
        text: 'Танцювальна руханка',
        url: 'https://youtu.be/wYVUjZhU14M',
      },
      {
        text: 'Зарядка-розтяжка',
        url: 'https://youtu.be/64b4bE5FzsQ',
      },
      {
        text: `М'яке пробудження`,
        url: 'https://youtu.be/IvJmeD0YO6s',
      },
    ],
  },
  {
    captions: [`Склянка 💧 води, пам'ятаєш?)`],
    active: true,
    recurrencePattern: [RECURRENCE_PATTERN.DAILY],
    scheduleType: SCHEDULE_TYPE.WAKE_UP_OFFSET,
    offset: 120,
    buttons: [
      confirmButton
    ]
  },
  {
    scheduleType: SCHEDULE_TYPE.WAKE_UP_OFFSET,
    offset: 200,
    captions: [
      `Час для б'юті. Не забувай про очищення, тонізацію, зволоження.`,
      'А тепер пінка, тонік, крем. Саме в такій послідовності.',
      'Вмивайся правильно, а далі нанеси тонік і крем.',
    ],
    active: true,
    recurrencePattern: [RECURRENCE_PATTERN.DAILY],
  },
  {
    captions: ['Шкірі бракує зволоження, випий склянку водички 💧'],
    active: true,
    recurrencePattern: [RECURRENCE_PATTERN.DAILY],
    scheduleType: SCHEDULE_TYPE.WAKE_UP_OFFSET,
    offset: 240,
    buttons: [
      confirmButton
    ]
  },
  {
    scheduleType: SCHEDULE_TYPE.WAKE_UP_OFFSET,
    offset: 300,
    captions: [`Твоя афірмація на день 😊`],
    active: true,
    recurrencePattern: [RECURRENCE_PATTERN.DAILY],
  },
  {
    captions: ['Освіжи себе склянкою води 💧'],
    active: true,
    recurrencePattern: [RECURRENCE_PATTERN.DAILY],
    scheduleType: SCHEDULE_TYPE.WAKE_UP_OFFSET,
    offset: 360,
    buttons: [
      confirmButton
    ]
  },
  {
    scheduleType: SCHEDULE_TYPE.EXACT_TIME,
    time: '17:15',
    captions: ['Не забувай, що сьогодні час карбоксі о 18:00 :)'],
    active: true,
    recurrencePattern: [RECURRENCE_PATTERN.SATURDAY],
  },
  {
    scheduleType: SCHEDULE_TYPE.EXACT_TIME,
    time: '18:00',
    captions: ['Carboxy time ⏰\nГотова?'],
    active: true,
    recurrencePattern: [RECURRENCE_PATTERN.SATURDAY],
  },
  {
    captions: ['Пересохло в горлі, випий склянку води 💧'],
    active: true,
    recurrencePattern: [RECURRENCE_PATTERN.DAILY],
    scheduleType: SCHEDULE_TYPE.WAKE_UP_OFFSET,
    offset: 480,
    buttons: [
      confirmButton
    ]
  },
  {
    captions: ['Час зробити ковток води 💧'],
    active: true,
    recurrencePattern: [RECURRENCE_PATTERN.DAILY],
    scheduleType: SCHEDULE_TYPE.WAKE_UP_OFFSET,
    offset: 600,
    buttons: [
      confirmButton
    ]
  },
  {
    captions: ['Освіжи себе склянкою води 💧'],
    active: true,
    recurrencePattern: [RECURRENCE_PATTERN.DAILY],
    scheduleType: SCHEDULE_TYPE.WAKE_UP_OFFSET,
    offset: 720,
    buttons: [
      confirmButton
    ]
  },
  {
    scheduleType: SCHEDULE_TYPE.BED_TIME_OFFSET,
    offset: 200,
    captions: ['Відпочинь від соцмереж. Приділи час собі 😊', 'Телефон в сторону, час для себе настав.', 'Час відкласти телефон'],
    active: true,
    recurrencePattern: [RECURRENCE_PATTERN.DAILY],
  },
  {
    scheduleType: SCHEDULE_TYPE.BED_TIME_OFFSET,
    offset: 140,
    captions: [
      `<a href='https://youtu.be/g_tea8ZNk5A'>Розтяжка</a> для розслаблення. Те, що треба ввечері 😌`,
      `<a href='https://youtu.be/g_tea8ZNk5A'>Порозтягуємось</a>?`,
      `Вечірня <a href='https://youtu.be/g_tea8ZNk5A'>розтяжка</a> вже чекає на тебе 😊`,
    ],
    active: true,
    recurrencePattern: [RECURRENCE_PATTERN.DAILY],
  },
  {
    scheduleType: SCHEDULE_TYPE.BED_TIME_OFFSET,
    offset: 60,
    captions: [
      'Потурбуйся про себе. Змий всю косметику з обличчя та вмийся. Не забувай про 3 кроки догляду.',
      'Вечірні ритуали за розкладом. Час змити декоративну косметику, вмитись, а далі тонік + крем.',
      'Змивай декоративку і не забудь про правильний вечірній догляд',
    ],
    active: true,
    recurrencePattern: [RECURRENCE_PATTERN.DAILY],
  },
  {
    scheduleType: SCHEDULE_TYPE.BED_TIME_OFFSET,
    offset: 20,
    captions: [
      'Подякуй цьому дню та заплануй наступний.',
      'Правда ж день був чудовим? Що було класного? Згадай:)',
      'У тебе був чудовий день? Чому?',
    ],
    active: true,
    recurrencePattern: [RECURRENCE_PATTERN.DAILY],
  },
  {
    scheduleType: SCHEDULE_TYPE.BED_TIME_OFFSET,
    offset: 0,
    captions: ['Відпочивай, красуне!', 'Добраніч, прекрасна дівчинко:)', 'Час вкладатись спатки.'],
    active: true,
    recurrencePattern: [RECURRENCE_PATTERN.DAILY],
  },
];
