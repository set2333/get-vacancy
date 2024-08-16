import { Message, IStore } from '@get-vacancy/types';

export class MemoryStore implements IStore {
  private vacancies: Record<Message['url'], Message> = {};

  push(vacancies: Message[]) {
    vacancies.forEach((vacancy) => (this.vacancies[vacancy.url] = vacancy));
  }

  has({ url }: Pick<Message, 'url'>) {
    return !!this.vacancies[url];
  }

  getAll() {
    return Object.values(this.vacancies);
  } 

  get isEmpty() {
    return Object.keys(this.vacancies).length === 0;
  }
}
