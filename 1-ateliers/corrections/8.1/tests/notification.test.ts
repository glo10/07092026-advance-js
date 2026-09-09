import { describe, it, expect, vi } from 'vitest';
import Notification from '../../6.1/src/notification';

describe('Testing Notification Class', () => {
  it('should instantiate with "Hello world" notification', () => {
    const notif = new Notification('Hello World');
    expect(notif.message).toBe('Hello World');
  });

    it('should instantiate with a default date', () => {
    const notif = new Notification('Hello World');
    expect(notif.timestamp).toBeInstanceOf(Date);
  });

  it('should call console.log on send()', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const date = new Date();
    const notif = new Notification('Test Message', date);

    notif.send();

    expect(consoleSpy).toHaveBeenCalledWith(
      `[NOTIFICATION] (${date.toISOString()}) : Test Message`
    );
    consoleSpy.mockRestore();
  });
});
