export interface StaticData {
  data: StaticDataItem[];
}

export interface StaticDataItem {
  callbackData: string | string[];
  getMarkupTargetKey?: (callback?: string) => string;
  response?: string;
}
