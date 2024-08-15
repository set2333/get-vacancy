import { MemoryStore } from './memory-store';

describe('MemoryStore', () => {
  const store = new MemoryStore();

  it('should work', () => {
    const data = [
      { name: 'test1', url: 'https://test.com/1' },
      { name: 'test2', url: 'https://test.com/2' },
    ];

    expect(store.isEmpty).toBe(true);
    expect(store.has(data[0])).toBe(false);
    store.push(data);
    expect(store.isEmpty).toBe(false);
    expect(store.has(data[0])).toBe(true);
    expect(store.getAll()).toEqual(data);
  });
});
