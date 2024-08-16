import amqp from 'amqplib';
import { EXCHANGE_NAME, EXCHANGE_OPTIONS, EXCHANGE_TYPE, MESSAGES_TYPE } from '@get-vacancy/consts';
import type { Config, Message, } from '@get-vacancy/types';
import { ISender } from '@get-vacancy/types';
import { Configurator } from '@get-vacancy/configurator';

const delay = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms));

export class Sender implements ISender {
  config: Pick<Config, 'connectionPath'>;

  constructor() {
    const configurator = new Configurator();
    this.config = configurator.get();
  }

  async send(messages: Message[], messageType: MESSAGES_TYPE) {
    await Promise.all(messages.map(vacancy => this.sendMessage(vacancy, messageType)));
  }

  private async sendMessage(message: Message, messageType: MESSAGES_TYPE) {
    const connection = await amqp.connect(this.config.connectionPath);
    const channel = await connection.createChannel();
    await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE, EXCHANGE_OPTIONS);
    channel.publish(
      EXCHANGE_NAME,
      messageType,
      Buffer.from(JSON.stringify(message)),
    );
    await delay();
    await connection.close();
  }
}
