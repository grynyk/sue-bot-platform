import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';
import { NAVIGATION_CALLBACK, NAVIGATION_ICON } from '../enums';

export const interestingMarkup: Array<InlineKeyboardButton.CallbackButton[]> = [
  [
    {
      text: 'Рослинні джерела білка',
      callback_data: 'interesting_vegan_protein_sources',
    },
    {
      text: 'Джерело вітаміну С',
      callback_data: 'interesting_vitamine_c_sources',
    },
  ],
  [
    { text: 'Джерело омега', callback_data: 'interesting_omega_sources' },
    { text: 'Джерело кальцію', callback_data: 'interesting_calcium_sources' },
  ],
  [
    { text: 'Джерело заліза', callback_data: 'interesting_iron_sources' },
    { text: 'Джерело селену', callback_data: 'interesting_selenium_sources' },
  ],
  [
    { text: 'Джерело цинку', callback_data: 'interesting_zinc_sources' },
    {
      text: 'Продукти-антиоксиданти',
      callback_data: 'interesting_antioxidant_products',
    },
  ],
  [
    {
      text: 'Динамічні афірмації',
      callback_data: 'interesting_dynamic_affirmations',
    },
    {
      text: 'Музичні афірмації',
      callback_data: 'interesting_music_affirmations',
    },
  ],
  [{ text: NAVIGATION_ICON.CLOSE, callback_data: NAVIGATION_CALLBACK.CLOSE }],
];

export const interestingAffirmationsMarkups: {
  [name: string]: Array<InlineKeyboardButton.CallbackButton[]>;
} = {
  INTERESTING_DYNAMIC_AFFIRMATIONS: [
    [
      {
        text: 'На удачу',
        callback_data: 'interesting_dynamic_affirmations_luck',
      },
      {
        text: 'Сила кохання',
        callback_data: 'interesting_dynamic_affirmations_love',
      },
    ],
    [
      {
        text: 'Сила пристрасті',
        callback_data: 'interesting_dynamic_affirmations_passion',
      },
      {
        text: `Сила здоров'я та молодості`,
        callback_data: 'interesting_dynamic_affirmations_health',
      },
    ],
    [
      {
        text: 'Сила родини та багатства',
        callback_data: 'interesting_dynamic_affirmations_family',
      },
      {
        text: 'Сила грошей',
        callback_data: 'interesting_dynamic_affirmations_money',
      },
    ],
    [
      {
        text: 'Жіноча сила',
        callback_data: 'interesting_dynamic_affirmations_female',
      },
      {
        text: 'Сила материнства',
        callback_data: 'interesting_dynamic_affirmations_motherhood',
      },
    ],
    [
      {
        text: 'Сила краси',
        callback_data: 'interesting_dynamic_affirmations_beauty',
      },
      {
        text: 'Сила розуму',
        callback_data: 'interesting_dynamic_affirmations_mind',
      },
    ],
    [
      {
        text: 'Сила успіху та тріумфу',
        callback_data: 'interesting_dynamic_affirmations_success',
      },
      {
        text: 'Для миру та перемоги',
        callback_data: 'interesting_dynamic_affirmations_peace_victory',
      },
    ],
    [
      {
        text: NAVIGATION_ICON.BACK,
        callback_data: NAVIGATION_CALLBACK.INTERESTING_BACK,
      },
    ],
  ],
  INTERESTING_MUSIC_AFFIRMATIONS: [
    [
      {
        text: 'Міцний шлюб',
        callback_data: 'interesting_music_affirmations_marriage',
      },
    ],
    [
      {
        text: 'Cила роду',
        callback_data: 'interesting_music_affirmations_family',
      },
    ],
    [
      {
        text: 'Жіноча сила',
        callback_data: 'interesting_music_affirmations_female',
      },
    ],
    [
      {
        text: NAVIGATION_ICON.BACK,
        callback_data: NAVIGATION_CALLBACK.INTERESTING_BACK,
      },
    ],
  ],
};
