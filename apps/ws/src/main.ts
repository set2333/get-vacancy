import WebSocket from 'ws';
import { Consumer } from '@get-vacancy/consumer';
import { MESSAGES_TYPE } from '@get-vacancy/consts';
import { MemoryStore } from '@get-vacancy/memory-store';
import { Message } from '@get-vacancy/types';
import { PORT } from './config';

const store = new MemoryStore();

const wss = new WebSocket.Server({ port: PORT });

wss.on('connection', (ws) => {
  ws.on('message', (query) => {
    if (query.toString() === 'get all messages') {
      const messages = store
        .getAll()
        .map((message) => ({ ...message, messageType: MESSAGES_TYPE.INITIAL }));
      ws.send(JSON.stringify(messages));
    }
  });
});

const consumer = new Consumer(
  (msg) => {
    const message: Message = {
      ...JSON.parse(msg.content.toString()),
      messageType: msg.fields.routingKey,
    };
    store.push([message]);

    wss.clients.forEach((client) => {
      client.send(JSON.stringify(message));
    });
  },
  [MESSAGES_TYPE.INITIAL, MESSAGES_TYPE.NEW_VACANCY]
);

consumer.run();
