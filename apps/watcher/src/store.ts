class Store {
  vacancies = {};

  push(vacancies) {
    vacancies.forEach(({ name, url }) => this.vacancies[url] = name);
  }

  has({ url }) {
    return !!this.vacancies[url];
  }

  get isEmpty() {
    return Object.keys(this.vacancies).length === 0;
  }
}

export default Store;