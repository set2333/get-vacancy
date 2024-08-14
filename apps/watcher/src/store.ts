import { Message } from '@get-vacancy/types';

class Store {
  vacancies: Record<Message['url'], Message['name']> = {};

  push(vacancies: Message[]) {
    vacancies.forEach(({ name, url }) => (this.vacancies[url] = name));
  }

  has({ url }: Message) {
    return !!this.vacancies[url];
  }

  get isEmpty() {
    return Object.keys(this.vacancies).length === 0;
  }
}

export default Store;
