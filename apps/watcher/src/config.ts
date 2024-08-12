export const parseRules = [
  {
    selector: '.vacancy-card__title a',
    lintTemplate: 'https://career.habr.com/{URL}',
    url: 'https://career.habr.com/vacancies?remote=true&s%5B%5D=3&type=all',
  },
  {
    selector: '.vacancy-card__title a',
    lintTemplate: 'https://career.habr.com/{URL}',
    url: 'https://career.habr.com/vacancies?remote=1&s[]=4&type=all',
  },
  {
    url: 'https://kyzyl.hh.ru/search/vacancy?resume=46fd7c8bff0d33fbd90039ed1f6e544a4d4e41&from=resumelist&hhtmFrom=resume_list',
    options: {
      headers: { 'Cookie': 'hhtoken=aYd152sjykcjljs0HhHB3dtIYp!I' },
    },
    selector: '.vacancy-search-item__card h2 span a',
  },
];

export const fetchDelay = +(process.env.DELAY ?? 60000);
