import express from 'express';
import { Consumer } from '@get-vacancy/consumer';
import { MESSAGES_TYPE } from '@get-vacancy/consts';

const messages = [];

const consumer = new Consumer(
  (msg) => messages.push(JSON.parse(msg.content.toString())),
  [MESSAGES_TYPE.INITIAL, MESSAGES_TYPE.NEW_VACANCY],
);

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.get('/', (req, res) => {
  res.send({ messages });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});

consumer.run();