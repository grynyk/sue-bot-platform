import { DataUtils } from '../shared/utils';
import {
  getAllSkinTestComplexSizeCallbacks,
  getAllSkinTestCompositionCallbacks,
  getAllSkinTestRecommendationsCallbacks,
  getAllSkinTestUsageCallbacks,
  interestingData,
  notificationsTimeData,
  recipesData,
  skinTestCallbacksData,
} from './data';
import { NAVIGATION_CALLBACK } from '../shared/enums';

export const allCallbacksToListen: string[] = [
  ...Object.values(NAVIGATION_CALLBACK),
  ...getAllSkinTestComplexSizeCallbacks(),
  ...getAllSkinTestCompositionCallbacks(),
  ...getAllSkinTestUsageCallbacks(),
  ...getAllSkinTestRecommendationsCallbacks(),
  ...DataUtils.getAllStaticDataCallbacks(skinTestCallbacksData),
  ...DataUtils.getAllStaticDataCallbacks(recipesData),
  ...DataUtils.getAllStaticDataCallbacks(interestingData),
  ...DataUtils.getAllStaticDataCallbacks(notificationsTimeData),
];
