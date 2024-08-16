import { Fetcher } from './fetcher';

global.fetch = jest.fn(async () => ({
  text: async () => 'some data',
})) as jest.Mock;

describe('Fetcher', () => {
  const rules = [
    { url: 'https://test.com' },
    {
      url: 'https://test-with-options.com',
      options: { headers: { 'Content-type': 'application/json' } },
    },
  ];
  const fetcher = new Fetcher(rules);
  it('should work', async () => {
    expect(await fetcher.fetch()).toEqual(rules.map(({ url }) => ({ [url]: 'some data'})));
  });
});
