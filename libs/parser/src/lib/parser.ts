import { parse } from 'node-html-parser';
import { Message } from '@get-vacancy/types';
import { FetchedData, IParser, Rule } from '@get-vacancy/types';

export class Parser implements IParser {
  constructor(private rules: Rule[]) {}

  parse(data: FetchedData[]): Message[] {
    return data
      .map((value) => Object.entries(value).flat())
      .map(([url, html]) => {
        const { selector, lintTemplate } = this.rules.find(
          (rule) => rule.url === url
        );
        const root = parse(html);

        return root.querySelectorAll(selector).map((vacancy) => ({
          name: vacancy.innerText,
          url:
            lintTemplate?.replace('{URL}', vacancy.getAttribute('href')) ||
            vacancy.getAttribute('href'),
        }));
      })
      .flat()
      .reverse(); // TODO: sorting by date
  }
}
