import express from 'express';
import { Consumer } from '@get-vacancy/consumer';
import { MESSAGES_TYPE } from '@get-vacancy/consts';
import { MemoryStore } from '@get-vacancy/memory-store';
import { host, port } from './config';

const store = new MemoryStore();

const consumer = new Consumer(
  (msg) => store.push([JSON.parse(msg.content.toString())]),
  [MESSAGES_TYPE.INITIAL, MESSAGES_TYPE.NEW_VACANCY]
);

const app = express();

app.get('/', (_, res) => {
  res.send({ messages: store.getAll() });
});

app.listen(port, host, () => {
  consumer.run().then(() => console.log(`[ ready ] http://${host}:${port}`));
});
