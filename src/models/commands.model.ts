export enum BOT_COMMAND_NAME {
  START = 'start',
  RECIPES = 'recipes',
  TIPS = 'tips',
  SKIN_TYPE_TEST = 'skintest',
  SETTINGS = 'settings',
  STATS = 'stats',
}

export const BOT_COMMAND_DESCRIPTION: { [key in BOT_COMMAND_NAME]: string } = {
  [BOT_COMMAND_NAME.START]: 'Зареєструватись',
  [BOT_COMMAND_NAME.SKIN_TYPE_TEST]: 'Тест на визначення типу шкіри',
  [BOT_COMMAND_NAME.RECIPES]: 'Переглянути рецепти',
  [BOT_COMMAND_NAME.TIPS]: 'Дізнатись цікаву інформацію',
  [BOT_COMMAND_NAME.SETTINGS]: 'Налаштування',
  [BOT_COMMAND_NAME.STATS]: 'Статистика',
};
