import { NAVIGATION_CALLBACK } from '../../../models/navigation.model';
import { SETTINGS_MAIN_BUTTON_CALLBACK, SETTINGS_NOTIFICATIONS_BUTTON_CALLBACK } from '../enums/settings.enum';

export interface SettingsCallbacks {
  MAIN: typeof SETTINGS_MAIN_BUTTON_CALLBACK;
  NOTIFICATIONS: typeof SETTINGS_NOTIFICATIONS_BUTTON_CALLBACK;
}

export interface SettingsLabels {
  MAIN: Record<SETTINGS_MAIN_BUTTON_CALLBACK, string>;
  NOTIFICATIONS: Record<SETTINGS_NOTIFICATIONS_BUTTON_CALLBACK, string>;
}

export interface SettingsResponses {
  MAIN: Record<SETTINGS_MAIN_BUTTON_CALLBACK, string>;
}

export interface SettingsSceneStructure {
  CALLBACKS: SettingsCallbacks;
  LABELS: SettingsLabels;
  RESPONSES: SettingsResponses;
}

export type SettingsSceneContextType = NAVIGATION_CALLBACK | SETTINGS_MAIN_BUTTON_CALLBACK | SETTINGS_NOTIFICATIONS_BUTTON_CALLBACK;
