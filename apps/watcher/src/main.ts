import { MESSAGES_TYPE } from '@get-vacancy/consts';
import { MemoryStore } from '@get-vacancy/memory-store';
import type { IStore, IConfigurator, IFetcher, IParser, ISender, Config } from '@get-vacancy/types';
import { Fetcher } from '@get-vacancy/fetcher';
import { Parser } from '@get-vacancy/parser';
import { Sender } from '@get-vacancy/sender';
import { Configurator } from '@get-vacancy/configurator';

const delay = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms));

class Watcher {
  store: IStore;
  fetcher: IFetcher;
  parser: IParser;
  sender: ISender;
  configurator: IConfigurator;
  config: Pick<Config, 'parseRules' | 'fetchDelay'>;

  constructor() {
    this.configurator = new Configurator();
    this.config = this.configurator.get();
    this.store = new MemoryStore();
    this.fetcher = new Fetcher(this.config.parseRules);
    this.parser = new Parser(this.config.parseRules);
    this.sender = new Sender();
  }

  async run() {
    const fetchedData = await this.fetcher.fetch();
    const vacancies = await this.parser.parse(fetchedData);
    await this.sender.send(
      vacancies,
      this.store.isEmpty ? MESSAGES_TYPE.INITIAL : MESSAGES_TYPE.NEW_VACANCY,
    );
    this.store.push(vacancies);
    await delay(this.config.fetchDelay);
    this.run();
  }
}

const watcher = new Watcher();

watcher.run();