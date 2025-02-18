import { UsersDatabaseMiddleware } from '../users.db';
import * as db from '../pool.db';
import { BotUser } from '../models';

jest.mock('../pool.db');

describe('UsersDatabaseMiddleware', () => {
  const mockBotUser: BotUser = {
    id: 1,
    firstName: 'Chad',
    lastName: 'Faker',
    username: 'faker',
    skinType: null,
    timestamp: '2021-01-01T00:00:00.000Z',
    notificationsEnabled: true,
    wakeUpTime: '08:00',
    bedTime: '23:00',
    doneTasksCounter: 0,
    wasActiveToday: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create user table', async () => {
    await UsersDatabaseMiddleware.init();
    expect(db.query).toHaveBeenCalledWith(expect.stringContaining('CREATE TABLE IF NOT EXISTS'));
  });

  it('should increment done tasks counter', async () => {
    jest.spyOn(UsersDatabaseMiddleware, 'getById').mockResolvedValue(mockBotUser);
    await UsersDatabaseMiddleware.incrementDoneTasksCounterByUserId('1');
    expect(db.query).toHaveBeenCalledWith(expect.stringContaining('UPDATE users SET done_tasks_counter'), ['1']);
  });

  it('should reset done tasks counter for all users', async () => {
    await UsersDatabaseMiddleware.resetDoneTasksCounterToAllUsers();
    expect(db.query).toHaveBeenCalledWith(expect.stringContaining('UPDATE users SET done_tasks_counter'), [0]);
  });

  it('should reset was active today flag for all users', async () => {
    await UsersDatabaseMiddleware.resetWasActiveTodayFlagToAllUsers();
    expect(db.query).toHaveBeenCalledWith(expect.stringContaining('UPDATE users SET was_active_today'), [false]);
  });

  it('should update notifications flag by user id', async () => {
        jest.spyOn(UsersDatabaseMiddleware, 'getById').mockResolvedValue(mockBotUser);
    await UsersDatabaseMiddleware.updateNotificationsFlagByUserId(true, '1');
    expect(db.query).toHaveBeenCalledWith(expect.stringContaining('UPDATE users SET notifications_enabled'), [true, '1']);
  });

  it('should update skin type by user id', async () => {
        jest.spyOn(UsersDatabaseMiddleware, 'getById').mockResolvedValue(mockBotUser);
    await UsersDatabaseMiddleware.updateSkinTypeByUserId('oily', '1');
    expect(db.query).toHaveBeenCalledWith(expect.stringContaining('UPDATE users SET skin_type'), ['oily', '1']);
  });

  it('should update notifications wake up time by user id', async () => {
        jest.spyOn(UsersDatabaseMiddleware, 'getById').mockResolvedValue(mockBotUser);
    await UsersDatabaseMiddleware.updateNotificationsWakeUpTimeByUserId('08:00', '1');
    expect(db.query).toHaveBeenCalledWith(expect.stringContaining('UPDATE users SET wake_up_time'), ['08:00', '1']);
  });

  it('should update notifications bed time by user id', async () => {
        jest.spyOn(UsersDatabaseMiddleware, 'getById').mockResolvedValue(mockBotUser);
    await UsersDatabaseMiddleware.updateNotificationsBedTimeByUserId('23:00', '1');
    expect(db.query).toHaveBeenCalledWith(expect.stringContaining('UPDATE users SET bed_time'), ['23:00', '1']);
  });

  it('should delete user by id', async () => {
    await UsersDatabaseMiddleware.deleteById('1');
    expect(db.query).toHaveBeenCalledWith(expect.stringContaining('DELETE FROM users WHERE id'), ['1']);
  });

  it('should get user by id', async () => {
    (db.query as jest.Mock).mockResolvedValue({ rows: [mockBotUser], rowCount: 1 });
    const user = await UsersDatabaseMiddleware.getById('1');
    expect(user).toEqual(mockBotUser);
  });

  it('should get total number of users', async () => {
    (db.query as jest.Mock).mockResolvedValue({ rows: [{ count: 1 }] });
    const count = await UsersDatabaseMiddleware.getTotalNumber();
    expect(count).toEqual(1);
  });

  it('should get all active today users', async () => {
    (db.query as jest.Mock).mockResolvedValue({ rowCount: 1 });
    const count = await UsersDatabaseMiddleware.getAllActiveToday();
    expect(count).toEqual(1);
  });

  it('should get all done tasks today users', async () => {
    (db.query as jest.Mock).mockResolvedValue({ rowCount: 1 });
    const count = await UsersDatabaseMiddleware.getAllDoneTasksToday();
    expect(count).toEqual(1);
  });

  it('should get all users with disabled notifications', async () => {
    (db.query as jest.Mock).mockResolvedValue({ rowCount: 1 });
    const count = await UsersDatabaseMiddleware.getAllWithDisabledNotifications();
    expect(count).toEqual(1);
  });

  it('should get all users who completed skin test', async () => {
    (db.query as jest.Mock).mockResolvedValue({ rowCount: 1 });
    const count = await UsersDatabaseMiddleware.getAllWhoCompletedSkinTest();
    expect(count).toEqual(1);
  });

  it('should get all users with changed notifications time', async () => {
    (db.query as jest.Mock).mockResolvedValue({ rowCount: 1 });
    const count = await UsersDatabaseMiddleware.getAllWithChangedNotificationsTime();
    expect(count).toEqual(1);
  });
});
