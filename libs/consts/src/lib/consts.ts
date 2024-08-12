export const EXCHANGE_NAME = 'vacancies';

export const EXCHANGE_TYPE = 'direct';

export const EXCHANGE_OPTIONS = { durable: false };

export const QUEUE_NAME = '';

export const QUEUE_OPTIONS = { exclusive: true };

export enum MESSAGES_TYPE {
  INITIAL = 'INITIAL',
  NEW_VACANCY = 'NEW_VACANCY',
};