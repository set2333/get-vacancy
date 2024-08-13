import { MESSAGES_TYPE } from '@get-vacancy/consts';
import { Consumer } from './consumer';

describe('consumer', () => {
  const mockStore = {
    value: 0,
  };
  const consumer = new Consumer(() => mockStore.value += 1, [MESSAGES_TYPE.INITIAL]);

  beforeEach(() => {
    mockStore.value = 0;
  });

  it('should change value on handler', async () => {
    await consumer.run();
    expect(mockStore.value).toEqual(1);
  });
});
