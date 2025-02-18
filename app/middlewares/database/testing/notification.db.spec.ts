import { BotNotification, NOTIFICATION_TYPE, RECURRENCE_PATTERN } from "../models";
import { NotificationsDatabaseMiddleware } from "../notification.db";
import * as db from '../pool.db';

jest.mock('../pool.db');

describe('NotificationsDatabaseMiddleware', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    await NotificationsDatabaseMiddleware.init();
  });

  it('should create notifications table', async () => {
    expect(db.query).toHaveBeenCalledWith(expect.stringContaining('CREATE TABLE IF NOT EXISTS notifications'));
  });

  it('should insert a notification', async () => {
    const notification: BotNotification = {
      id: 'test-id',
      type: NOTIFICATION_TYPE.SCHEDULED_NOTIFICATION,
      captions: ['test-captions'],
      imageSource: 'test-image',
      replyButtons: null,
      recurrencePattern: RECURRENCE_PATTERN.EVERY_DAY,
      minutesBeforeSleep: null,
      minutesAfterWakeup: 20,
    };
    await NotificationsDatabaseMiddleware.insert(notification);
    expect(db.query).toHaveBeenCalledWith(expect.stringContaining('INSERT INTO notifications'), expect.any(Array));
  });

  it('should delete a notification by id', async () => {
    const id = 'test-id';
    await NotificationsDatabaseMiddleware.delete(id);
    expect(db.query).toHaveBeenCalledWith('DELETE FROM notifications WHERE id = $1', [id]);
  });

  it('should get all notifications', async () => {
    const mockRows = [
      {
        id: 'test-id',
        type: 'test-type',
        captions: 'test-captions',
        image_source: 'test-image',
        reply_buttons: 'test-buttons',
        recurrence_pattern: 'test-pattern',
        minutes_before_sleep: 10,
        minutes_after_wakeup: 20,
      },
    ];
    (db.query as jest.Mock).mockResolvedValueOnce({ rows: mockRows });

    const notifications = await NotificationsDatabaseMiddleware.getAll();

    expect(notifications).toHaveLength(1);
    expect(notifications[0].id).toBe('test-id');
  });

  it('should get a notification by id', async () => {
    const mockRow = {
      id: 'test-id',
      type: 'test-type',
      captions: 'test-captions',
      image_source: 'test-image',
      reply_buttons: 'test-buttons',
      recurrence_pattern: 'test-pattern',
      minutes_before_sleep: 10,
      minutes_after_wakeup: 20,
    };
    (db.query as jest.Mock).mockResolvedValueOnce({ rows: [mockRow] });

    const notification = await NotificationsDatabaseMiddleware.getById('test-id');

    expect(notification.id).toBe('test-id');
  });

  it('should drop the notifications table', async () => {
    await NotificationsDatabaseMiddleware.drop();
    expect(db.query).toHaveBeenCalledWith('DROP TABLE notifications');
  });
});
