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

export interface IStore {
  push: (messages: Message[]) => void;
  has: (message: Pick<Message, 'url'>) => boolean;
  getAll: () => Message[];
  isEmpty: boolean;
}

export type Rule = {
  url: string;
  selector: string;
  lintTemplate?: string;
  options?: { headers?: Record<string, string> };
};

export type FetchedData = { [key: Message['url']]: string };

export interface IFetcher {
  fetch: () => Promise<FetchedData[]>;
}

export interface IParser {
  parse: (data: FetchedData[]) => Message[];
}

export interface ISender {
  send: (messages: Message[], messageType: MESSAGES_TYPE) => Promise<void>;
}

export interface IConfigurator {
  get: () => Config;
}

export type Config = {
  parseRules: Rule[];
  connectionPath: string;
  fetchDelay: number;
}
