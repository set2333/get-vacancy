import amqp from 'amqplib';
import { parse } from 'node-html-parser';
import { EXCHANGE_NAME, EXCHANGE_OPTIONS, EXCHANGE_TYPE, MESSAGES_TYPE } from '@get-vacancy/consts';
import { MemoryStore } from '@get-vacancy/memory-store';
import type { Message } from '@get-vacancy/types';
import { connectionPath, parseRules, fetchDelay } from './config';

const store = new MemoryStore();

const delay = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms));

const sendMessage = async (message: Message, messageType: MESSAGES_TYPE) => {
  const connection = await amqp.connect(connectionPath);
  const channel = await connection.createChannel();
  await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE, EXCHANGE_OPTIONS);
  channel.publish(
    EXCHANGE_NAME,
    messageType,
    Buffer.from(JSON.stringify(message)),
  );
  await delay();
  await connection.close();
};

const getVacancies = async () => {
  const vacancies: Message[] = (
    await Promise.all(parseRules.map(async (rule) => {
      try {
        const response = await fetch(rule.url, rule?.options);
        const html = await response.text();
        const root = parse(html);
  
        return root.querySelectorAll(rule.selector).map(vacancy => ({
          name: vacancy.innerText,
          url: rule?.lintTemplate?.replace('{URL}', vacancy.getAttribute('href')) || vacancy.getAttribute('href'),
        }));
      } catch (error) {
        console.log('Error:', error);

        return [];
      }
    }))
  )
  .flat()
  .filter(vacancy => !store.has(vacancy))
  .reverse();

  await Promise.all(vacancies.map(vacancy => sendMessage(
    vacancy,
    store.isEmpty ? MESSAGES_TYPE.INITIAL : MESSAGES_TYPE.NEW_VACANCY),
  ));

  store.push(vacancies);
  await delay(fetchDelay);
  await getVacancies();
};

getVacancies();
