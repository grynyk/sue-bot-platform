import { DataUtils } from '../shared/utils';
import { HearPhrasesData } from './data';

export const allPhrasesToHear: string[] =
  DataUtils.getAllStaticDataCallbacks(HearPhrasesData);
