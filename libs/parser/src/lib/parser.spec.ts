import { Parser } from './parser';
import { data } from './fake-data';

describe('Parser', () => {
  const rules = [
    {
      selector: '.vacancy-card__title a',
      lintTemplate: 'https://career.habr.com/{URL}',
      url: 'https://career.habr.com/vacancies?remote=true&s%5B%5D=3&type=all',
    },
  ];

  const parser = new Parser(rules);
  it('should work', () => {
    expect(parser.parse(rules.map(({ url }) => ({ [url]: data })))).toEqual([
      {
        name: 'Начинающий React-разработчик ',
        url: 'https://career.habr.com//vacancies/1000146673',
      },
      {
        name: 'Frontend-разработчик (Angular)',
        url: 'https://career.habr.com//vacancies/1000145294',
      },
      {
        name: 'Team Lead frontend (react)',
        url: 'https://career.habr.com//vacancies/1000145876',
      },
      {
        name: 'Frontend Team Lead VK Гид',
        url: 'https://career.habr.com//vacancies/1000142532',
      },
      {
        name: 'Senior Frontend Developer',
        url: 'https://career.habr.com//vacancies/1000146703',
      },
      {
        name: 'Frontend-разработчик Angular (middle+/senior)',
        url: 'https://career.habr.com//vacancies/1000143265',
      },
      {
        name: 'Верстальщик/frontend разработчик',
        url: 'https://career.habr.com//vacancies/1000146712',
      },
      {
        name: 'Senior Frontend-разработчик',
        url: 'https://career.habr.com//vacancies/1000146714',
      },
      {
        name: 'JavaScript Developer (KISG)',
        url: 'https://career.habr.com//vacancies/1000144160',
      },
      {
        name: 'Frontend developer (Angular)',
        url: 'https://career.habr.com//vacancies/1000146198',
      },
      {
        name: 'Frontend developer (Vue)',
        url: 'https://career.habr.com//vacancies/1000142726',
      },
      {
        name: 'Разработчик Angular',
        url: 'https://career.habr.com//vacancies/1000136080',
      },
      {
        name: 'Middle frontend developer (Angular)',
        url: 'https://career.habr.com//vacancies/1000142907',
      },
      {
        name: 'Старший Frontend разработчик',
        url: 'https://career.habr.com//vacancies/1000146744',
      },
      {
        name: 'JavaScript Developer (KES Cloud)',
        url: 'https://career.habr.com//vacancies/1000146503',
      },
      {
        name: 'Middle+/Senior Frontend developer Vue.JS',
        url: 'https://career.habr.com//vacancies/1000146523',
      },
      {
        name: 'JavaScript Developer (MyKaspersky)',
        url: 'https://career.habr.com//vacancies/1000142555',
      },
      {
        name: 'Разработчик .NET с опытом работы с ASP.NET Core, MS SQL',
        url: 'https://career.habr.com//vacancies/1000142063',
      },
      {
        name: 'Tech Lead [Корпоративный портал]',
        url: 'https://career.habr.com//vacancies/1000146255',
      },
      {
        name: 'Frontend разработчик (React) One Day Offer',
        url: 'https://career.habr.com//vacancies/1000146786',
      },
      {
        name: 'Разработчик Vue JS (Remote)',
        url: 'https://career.habr.com//vacancies/1000144615',
      },
      {
        name: 'Разработчик Vue JS (Remote)',
        url: 'https://career.habr.com//vacancies/1000144616',
      },
      {
        name: 'Frontend Developer (Middle+/Senior)',
        url: 'https://career.habr.com//vacancies/1000145016',
      },
      {
        name: 'JavaScript Developer (NGFW)',
        url: 'https://career.habr.com//vacancies/1000144641',
      },
      {
        name: 'Frontend-разработчик (Angular, TS)',
        url: 'https://career.habr.com//vacancies/1000146480',
      },
    ]);
  });
});
