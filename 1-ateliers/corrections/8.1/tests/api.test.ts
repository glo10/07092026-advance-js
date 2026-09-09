import { describe, it, expect, vi } from 'vitest';
import { fetchUserData, findUsers } from '../../6.1/src/api';

describe('Testing fetchUserData()', () => {
  it('should resolve with UserData for an even ID', async () => {
    const data = await fetchUserData(4);
    expect(data).toEqual({ id: 4, isIdEven: true });
  });

  it('should reject with an error for an odd ID', async () => {
    await expect(fetchUserData(3)).rejects.toThrow('3 is odd');
  });
});

describe('Testing findUsers()', () => {
  it('should fetch and map users correctly', async () => {
    const mockUsers = [
      { id: 1, login: 'alice', url: 'https://api.github.com/users/alice', node_id: '123' },
      { id: 2, login: 'bob', url: 'https://api.github.com/users/bob', node_id: '456' }
    ];

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockUsers)
    }));

    const result = await findUsers();

    expect(fetch).toHaveBeenCalledWith('https://api.github.com/users');
    expect(result).toEqual([
      { id: 1, login: 'alice', url: 'https://api.github.com/users/alice' },
      { id: 2, login: 'bob', url: 'https://api.github.com/users/bob' }
    ]);

    vi.unstubAllGlobals();
  });

  it('should catch network errors and return the error', async () => {
    const networkError = new Error('Network Failure');
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(networkError));

    const result = await findUsers();

    expect(result).toBe(networkError);

    vi.unstubAllGlobals();
  });
});