import { DataUtils } from '../../shared/utils';
import { NotificationMessage } from '../../models';
import { NAVIGATION_CALLBACK } from '../../shared/enums';
import moment from 'moment';

export const affirmationsImagesTokens: string[] = [
  'AgACAgQAAxkBAAIKF2BpxHMd1wETiI-zv3Qq46GJhdPsAAJ5szEbilNJU-PtRAp0-GEvZqT_KF0AAwEAAwIAA3kAAyhpBQABHgQ',
  'AgACAgQAAxkBAAIKGGBpxKV0AhFuIv-B0iRNNQfy0fARAAJ6szEbilNJU8qjhfQ2PqO3Dy4pKl0AAwEAAwIAA3kAA_JzBAABHgQ',
  'AgACAgQAAxkBAAIKGWBpxMZOHQxO6fJCIdH2Fb60B4C5AAJ8szEbilNJU_Y4cV4f7GRMSE3DKl0AAwEAAwIAA3kAA_CCAwABHgQ',
  'AgACAgQAAxkBAAIKGmBpxNqi08haIVYlFItMpBirZZ9vAAJ9szEbilNJU7NO2CDX2-LeoU6oJ10AAwEAAwIAA3kAA_T9BgABHgQ',
  'AgACAgQAAxkBAAIKG2BpxPehb5rfpxHJMD_WKi4GnRYaAAJ-szEbilNJU637UUm5RSsBXGmuJ10AAwEAAwIAA3kAA5npBgABHgQ',
  'AgACAgQAAxkBAAIKHGBpxQ1npg3TZaGDQ2qZ8lIHvBlEAAJ_szEbilNJU76Uxyd6Fpo4aQwFJ10AAwEAAwIAA3kAA7cFBwABHgQ',
  'AgACAgQAAxkBAAIKHWBpxSUQqXV0p-PLiBwiddxl91gmAAKAszEbilNJU-Xevb1vjyu6qt01J10AAwEAAwIAA3kAA1b8BgABHgQ',
  'AgACAgQAAxkBAAIKHmBpxUI8tG-HRP7gtAWh3pv8ziw0AAKBszEbilNJU0y4mbSunIfSvS0pKl0AAwEAAwIAA3kAA1N7BAABHgQ',
  'AgACAgQAAxkBAAIKH2BpxVZl-6uKgLBiIsNYDAABnyQlHAACgrMxG4pTSVNDQYtz9iOXcQr9HiddAAMBAAMCAAN5AANs9QYAAR4E',
  'AgACAgQAAxkBAAIKIGBpxX94wErxAAGFVF_uqtEoThNH9wACg7MxG4pTSVOFjRDVPxbWRLT-siddAAMBAAMCAAN5AAPq7wYAAR4E',
  'AgACAgQAAxkBAAIKIWBpxZf5Z_sSd0-LdakqcB6lffmyAAKEszEbilNJUwZS7aUAAVMifGmeCSddAAMBAAMCAAN5AANiCgcAAR4E',
  'AgACAgQAAxkBAAIKImBpxavAQiI2-xQ_2VTeBEyMmcRWAAKFszEbilNJUxuHxAUikkIWF7a-Kl0AAwEAAwIAA3kAA0CFAwABHgQ',
  'AgACAgQAAxkBAAIKI2BpxcFAuilnP3QNUiev_uhiqtBLAAKGszEbilNJUwJdK1HeHO3GYJV9J10AAwEAAwIAA3kAA3fmBgABHgQ',
  'AgACAgQAAxkBAAIKJGBpxdjI60XtnMItfqHDU4K4ASj4AAKHszEbilNJU7ifMXGahUmKRBz-KF0AAwEAAwIAA3kAAzNrBQABHgQ',
  'AgACAgQAAxkBAAIKJWBpxiVlSOisgHtnNFrMyIVYlycjAAKJszEbilNJU_vRjnLKuz22EzaiJ10AAwEAAwIAA3kAAyIAAQcAAR4E',
  'AgACAgQAAxkBAAIKJmBpxjY-sWD-_AF55zxv8cWgv5CYAAKKszEbilNJU6WWb7Y6-4DBA4EeKl0AAwEAAwIAA3kAA_Q-BAABHgQ',
  'AgACAgQAAxkBAAIKJ2BpxlyViwhkNCp5bTFcPG8BKqsZAAKLszEbilNJU8-C0GDLm6T_0vccKl0AAwEAAwIAA3kAA4p2BAABHgQ',
  'AgACAgQAAxkBAAIKKGBpxmspbXkkvBjFQ1Lnmx7atG-CAAKMszEbilNJU1V6XnHI_LC5K7e-Kl0AAwEAAwIAA3kAAwGEAwABHgQ',
  'AgACAgQAAxkBAAIKKWBpxn5r4fdolv2OY-Mzav1BBPB7AAKNszEbilNJU4qIMK1RA6X_EDG9Kl0AAwEAAwIAA3kAA3OlAwABHgQ',
  'AgACAgQAAxkBAAIKKmBpxpeFYFo3ME94gQ1nBcMUDst7AAKOszEbilNJU-iJa5Mis-snxKHgK10AAwEAAwIAA3kAA3LeAgABHgQ',
  'AgACAgQAAxkBAAEFQBZiASLVGis4yXg23MFqZnCA1nEB3gACeLoxG6z2CVCNt4qrirlt4QEAAwIAA3kAAyME',
  'AgACAgQAAxkBAAEFQBdiASLVpXbdeQx3-wyZI-61xCafCAACe7oxG6z2CVCCp4kjp3TRmwEAAwIAA3kAAyME',
  'AgACAgQAAxkBAAEFQBpiASLVdGf_uR-poETGPX73ektc3QACI7gxGy3qCFBH62KZsvy_jQEAAwIAA3kAAyME',
  'AgACAgQAAxkBAAEFQBxiASLWC_m0xs8S96z4P5Vu9vczDAACeroxG6z2CVDFosAn9m7NxwEAAwIAA3kAAyME',
  'AgACAgQAAxkBAAEFQB5iASLW_v7gl1P4ICDIK4K6xaVWkAACJLgxGy3qCFAFZ0THQ6_TbAEAAwIAA3kAAyME',
  'AgACAgQAAxkBAAEFQCBiASLWeePKerTCdOhjmlCqFwSrPQACeboxG6z2CVADVpdKC028nQEAAwIAA3kAAyME',
  'AgACAgQAAxkBAAEFQCJiASLWc_8u1j3XlshiknuKRFPOOwACJbgxGy3qCFBuY6blELcU5QEAAwIAA3kAAyME',
  'AgACAgQAAxkBAAEFQCRiASLWPX3yVi_cNIO_kPFWCqu_pQACJrgxGy3qCFArY459pSCyeAEAAwIAA3kAAyME',
  'AgACAgQAAxkBAAEFQCZiASLW1cYPtOloe2SZ6C1pTr6KiwACfLoxG6z2CVCO_X-byMyNswEAAwIAA3kAAyME',
  'AgACAgQAAxkBAAEFQChiASLXJk-feFcdSB424A9JhkYCXgACJ7gxGy3qCFAu7YCegFO--AEAAwIAA3kAAyME',
  'AgACAgQAAxkBAAEFQCpiASLXkwwIMJTmXuZW5-cWDouvggACKLgxGy3qCFAotB9ga6sUlAEAAwIAA3kAAyME',
];

export const waterNotificationsData: NotificationMessage[] = [
  {
    text: `Склянка 💧 води, пам'ятаєш?)`,
    reply_btn: [
      {
        text: 'Зроблено 💧',
        callback_data: NAVIGATION_CALLBACK.CONFIRM,
      },
    ],
  },
  {
    text: 'Шкірі бракує зволоження, випий склянку водички 💧',
    reply_btn: [
      {
        text: 'Зроблено 💧',
        callback_data: NAVIGATION_CALLBACK.CONFIRM,
      },
    ],
  },
  {
    text: 'Освіжи себе склянкою води 💧',
    reply_btn: [
      {
        text: 'Зроблено 💧',
        callback_data: NAVIGATION_CALLBACK.CONFIRM,
      },
    ],
  },
  {
    text: 'Пересохло в горлі, випий склянку води 💧',
    reply_btn: [
      {
        text: 'Зроблено 💧',
        callback_data: NAVIGATION_CALLBACK.CONFIRM,
      },
    ],
  },
  {
    text: 'Час зробити ковток води 💧',
    reply_btn: [
      {
        text: 'Зроблено 💧',
        callback_data: NAVIGATION_CALLBACK.CONFIRM,
      },
    ],
  },
  {
    text: 'Буль-буль. Це водичка, яку треба випити просто зараз.',
    reply_btn: [
      {
        text: 'Зроблено 💧',
        callback_data: NAVIGATION_CALLBACK.CONFIRM,
      },
    ],
  },
];

export const scheduledNotificationsData: NotificationMessage[] = [
  {
    time: 0,
    text: [
      'Прокидайся, красуне 👋',
      'Прокидайся, дівчинко! Сьогодні буде прекрасний день:)',
      'Прокидайся, моя Sue girl! Світ чекає на тебе:)',
    ],
  },
  {
    time: 20, // 20 minutes difference to compare with wake up time
    text: [
      'Почни свій ранок зі склянки теплої води 💧',
      'Спершу склянка теплої води. Потім кава, добре?',
      'Склянка теплої води = гарний початок ранку.',
    ],
    reply_btn: [
      {
        text: 'Зроблено 💧',
        callback_data: NAVIGATION_CALLBACK.CONFIRM,
      },
    ],
  },
  {
    time: 40,
    text: [
      `Ранкова <a href='https://youtu.be/P2uKBkoveH4'>медитація</a> для спокійного дня. Спробуй :)`,
      `Спробуй <a href='https://youtu.be/P2uKBkoveH4'>медитацію</a>. Це допомагає боротись зі стресом та тривожністю, а ще чудово розслабляє 😊`,
      `Приділи 5 хв <a href='https://youtu.be/P2uKBkoveH4'>медитації</a>. Вона допоможе налаштуватися на гарний день.`,
    ],
  },
  {
    time: 60,
    text: [
      'Час для зарядки. Обирай під свій настрій сьогодні 👇',
      'Яку зарядку обираєш сьогодні?)',
      `Пам'ятаєш про зарядку? Твоє тіло тобі подякує :)`,
    ],
    reply_btn: [
      {
        text: 'Танцювальна руханка',
        callback_data: 'https://youtu.be/wYVUjZhU14M',
      },
      {
        text: 'Зарядка-розтяжка',
        callback_data: 'https://youtu.be/64b4bE5FzsQ',
      },
      {
        text: `М'яке пробудження`,
        callback_data: 'https://youtu.be/IvJmeD0YO6s',
      },
    ],
  },
  {
    time: 80,
    text: [
      `Час для б'юті. Не забувай про очищення, тонізацію, зволоження.`,
      'А тепер пінка, тонік, крем. Саме в такій послідовності.',
      'Вмивайся правильно, а далі нанеси тонік і крем.',
    ],
  },
  {
    time: 100,
    text: `Твоя афірмація на день 😊\n\n${getAdditionalAffirmation()}`,
    image: DataUtils.getRandomItemFromArray<string>(
      ...affirmationsImagesTokens
    ),
  },
  {
    time: 120,
    text: 'Випий склянку 💧 води, замість другої кави',
    reply_btn: [
      {
        text: 'Зроблено 💧',
        callback_data: NAVIGATION_CALLBACK.CONFIRM,
      },
    ],
  },
  {
    time: 240,
    ...DataUtils.getRandomItemFromArray<NotificationMessage>(
      ...waterNotificationsData
    ),
  },
  {
    time: 360,
    ...DataUtils.getRandomItemFromArray<NotificationMessage>(
      ...waterNotificationsData
    ),
  },
  {
    time: 480,
    ...DataUtils.getRandomItemFromArray<NotificationMessage>(
      ...waterNotificationsData
    ),
  },
  {
    time: 600,
    ...DataUtils.getRandomItemFromArray<NotificationMessage>(
      ...waterNotificationsData
    ),
  },
  {
    time: -210, // 210 minutes difference to compare with bedTime
    text: 'Не забувай, що сьогодні час карбоксі через 1 годину 20 хвилин :)',
    week_day: 6,
  },
  {
    time: -130,
    text: 'Carboxy time ⏰\nГотова?',
    image:
      'AgACAgQAAxkBAAIHUmBnFNd_h_0g9RKK47RhGTDbQNMwAAKCtDEbA8I4U3Qd11PoMqyr5yAmKl0AAwEAAwIAA3kAA5AvBAABHgQ',
    week_day: 6,
  },
  {
    time: -110,
    text: [
      'Відпочинь від соцмереж. Приділи час собі 😊',
      'Телефон в сторону, час для себе настав.',
      'Час відкласти телефон',
    ],
  },
  {
    time: -90,
    text: [
      `<a href='https://youtu.be/g_tea8ZNk5A'>Розтяжка</a> для розслаблення. Те, що треба ввечері 😌`,
      `<a href='https://youtu.be/g_tea8ZNk5A'>Порозтягуємось</a>?`,
      `Вечірня <a href='https://youtu.be/g_tea8ZNk5A'>розтяжка</a> вже чекає на тебе 😊`,
    ],
  },
  { time: -70, ...DataUtils.getRandomItemFromArray(...waterNotificationsData) },
  {
    time: -50,
    text: [
      'Потурбуйся про себе. Змий всю косметику з обличчя та вмийся. Не забувай про 3 кроки догляду.',
      'Вечірні ритуали за розкладом. Час змити декоративну косметику, вмитись, а далі тонік + крем.',
      'Змивай декоративку і не забудь про правильний вечірній догляд',
    ],
  },
  {
    time: -20,
    text: [
      'Подякуй цьому дню та заплануй наступний.',
      'Правда ж день був чудовим? Що було класного? Згадай:)',
      'У тебе був чудовий день? Чому?',
    ],
  },
  {
    time: 10000,
    text: [
      'Відпочивай, красуне!',
      'Добраніч, прекрасна дівчинко:)',
      'Час вкладатись спатки.',
    ],
  },
];

function getAdditionalAffirmation(): string {
  const dayOfWeek: number = moment().isoWeekday();
  const evenAffirmation: string = `А <a href='https://www.youtube.com/watch?v=ncjkZ1f9gbc&list=PLx3JWAOdkC8jyBkU8pmRayrqjG0cIyK4Y&index=8'>тут</a> лови музичну афірмацію 🎼`;
  const oddAffirmation: string = `Динамічна афірмація <a href='https://www.youtube.com/watch?v=JW13oLJ9MBE'>тут</a> 🧘🏻‍♀️`;
  return dayOfWeek % 2 === 0 ? evenAffirmation : oddAffirmation;
}
