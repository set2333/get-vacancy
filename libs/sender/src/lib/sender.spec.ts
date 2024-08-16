import { MESSAGES_TYPE } from '@get-vacancy/consts';
import { Sender } from './sender';
import { store } from '../../__mocks__/amqplib';

describe('Sender', () => {
  const sender = new Sender();
  it('should work', async () => {
    await sender.send([{ name: 'Vacancy 1', url: 'https://test.com' }], MESSAGES_TYPE.INITIAL);
    expect(Object.values(store)).not.toContain(false);
  });
});
