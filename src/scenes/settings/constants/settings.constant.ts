import { SETTINGS_MAIN_BUTTON_CALLBACK, SETTINGS_NOTIFICATIONS_BUTTON_CALLBACK } from '../enums/settings.enum';
import { SettingsSceneStructure } from '../models/settings.model';

export const SETTINGS: SettingsSceneStructure = {
  CALLBACKS: {
    MAIN: SETTINGS_MAIN_BUTTON_CALLBACK,
    NOTIFICATIONS: SETTINGS_NOTIFICATIONS_BUTTON_CALLBACK
  },
  LABELS: {
    MAIN: {
      [SETTINGS_MAIN_BUTTON_CALLBACK.NOTIFICATIONS]: 'Сповіщення',
    },
    NOTIFICATIONS: {
      [SETTINGS_NOTIFICATIONS_BUTTON_CALLBACK.DISABLE]: 'Вимкнути сповіщення',
      [SETTINGS_NOTIFICATIONS_BUTTON_CALLBACK.ENABLE]: 'Увімкнути сповіщення',
    }
  },
  RESPONSES: {
    MAIN: {
      [SETTINGS_MAIN_BUTTON_CALLBACK.NOTIFICATIONS]: 'Налаштування сповіщень',
    },
  },
};
