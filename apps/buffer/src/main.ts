import express from 'express';
import { Consumer } from '@get-vacancy/consumer';
import { MESSAGES_TYPE } from '@get-vacancy/consts';
import { host, port } from './config';
import { Message } from '@get-vacancy/types';

const messages: Message[] = [];

const consumer = new Consumer(
  (msg) => messages.push(JSON.parse(msg.content.toString())),
  [MESSAGES_TYPE.INITIAL, MESSAGES_TYPE.NEW_VACANCY]
);

const app = express();

app.get('/', (req, res) => {
  res.send({ messages });
});

app.listen(port, host, () => {
  consumer.run().then(() => console.log(`[ ready ] http://${host}:${port}`));
});
