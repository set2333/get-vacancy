import { MESSAGES_TYPE } from '@get-vacancy/consts';

export type Message = {
  name: string;
  url: string;
};

export type WSMessage = Message & {
  messageType: MESSAGES_TYPE;
};

export type MessageResponce = {
  content: Buffer;
  fields: {
    routingKey: string;
  };
};

export interface MessageStore {
  push: (messages: Message[]) => void;
  has: (message: Pick<Message, 'url'>) => boolean;
  getAll: () => Message[];
  isEmpty: boolean;
}