import WebSocket from 'ws';
import { Consumer } from '@get-vacancy/consumer';
import { MESSAGES_TYPE } from '@get-vacancy/consts';

const wss = new WebSocket.Server({ port: 8080 });

const consumer = new Consumer((msg) => {
  const message =  { ...JSON.parse(msg.content.toString()), messageType: msg.fields.routingKey };

  wss.clients.forEach((client) => {
    client.send(JSON.stringify(message));
  });
}, [MESSAGES_TYPE.INITIAL, MESSAGES_TYPE.NEW_VACANCY]);

consumer.run();
