import amqp from 'amqplib';
import { connectionPath } from './config';
import {
  EXCHANGE_NAME,
  EXCHANGE_OPTIONS,
  EXCHANGE_TYPE,
  MESSAGES_TYPE,
  QUEUE_NAME,
  QUEUE_OPTIONS,
} from '@get-vacancy/consts';
import type { MessageResponce } from '@get-vacancy/types';

export class Consumer {
  constructor(
    private handler: (msg: MessageResponce) => void,
    private messageTypes: MESSAGES_TYPE[]
  ) {}

  async run() {
    try {
      const connection = await amqp.connect(connectionPath);
      const channel = await connection.createChannel();
      await channel.assertExchange(
        EXCHANGE_NAME,
        EXCHANGE_TYPE,
        EXCHANGE_OPTIONS
      );
      const { queue } = await channel.assertQueue(QUEUE_NAME, QUEUE_OPTIONS);
      this.messageTypes.map(messageType =>
        channel.bindQueue(queue, EXCHANGE_NAME, messageType)
      );
      await channel.consume(queue, this.handler, { noAck: true });
    } catch (err) {
      console.log('???err', err);
    }
  }
}
