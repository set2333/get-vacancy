import WebSocket from 'ws';
import { Consumer, MESSAGES_TYPE } from '@get-vacancy/consumer'

const wss = new WebSocket.Server({ port: 8080 });

const consumer = new Consumer((msg) => {
  wss.clients.forEach((client) => {
    client.send(msg.content.toString())
  })
}, [MESSAGES_TYPE.INITIAL, MESSAGES_TYPE.NEW_VACANCY]);

consumer.run();
