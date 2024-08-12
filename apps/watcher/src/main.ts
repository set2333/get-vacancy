import amqp from 'amqplib';
import { parse } from 'node-html-parser';
import { connectionPath } from '@get-vacancy/config'
import { EXCHANGE_NAME, EXCHANGE_OPTIONS, EXCHANGE_TYPE, MESSAGES_TYPE } from '@get-vacancy/consumer'
import { parseRules, fetchDelay } from './config';
import Store from './store';

const store = new Store();

const delay = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms));

const sendMessage = async (message, messageType) => {
  const connection = await amqp.connect(connectionPath);
  const channel = await connection.createChannel();
  await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE, EXCHANGE_OPTIONS);
  channel.publish(
    EXCHANGE_NAME,
    messageType,
    // @ts-ignore-next-line
    Buffer.from(JSON.stringify(message), { 'content_type': 'application/json' }),
  );
  await delay();
  await connection.close();
};

const getVacancies = async () => {
  const vacancies = (
    await Promise.all(parseRules.map(async (rule) => {
      const response = await fetch(rule.url, rule?.options);
      const html = await response.text();
      const root = parse(html);

      return root.querySelectorAll(rule.selector).map(vacancy => ({
        name: vacancy.innerText,
        url: rule?.lintTemplate?.replace('{URL}', vacancy.getAttribute('href')) || vacancy.getAttribute('href'),
      }));
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

