import {
  MessagesDatabaseMiddleware,
  UsersDatabaseMiddleware,
} from '../middlewares';

export function resetDatabaseFlagsAndCounters() {
  (async () => {
    try {
      await UsersDatabaseMiddleware.resetDoneTasksCounterToAllUsers();
      await UsersDatabaseMiddleware.resetWasActiveTodayFlagToAllUsers();
      await MessagesDatabaseMiddleware.deleteAll();
    } catch (e: unknown) {
      throw new Error(`${e}`);
    }
  })();
}

resetDatabaseFlagsAndCounters();
