import { FetchedData, IFetcher, Rule } from '@get-vacancy/types';

export class Fetcher implements IFetcher {
  constructor(private rules: Pick<Rule, 'url' | 'options'>[]) {}

  async fetch(): Promise<FetchedData[]> {
    try {
      return await Promise.all(
        this.rules.map(async (rule) => {
          const response = await fetch(rule.url, rule?.options);
          const data = await response.text();

          return { [rule.url]: data };
        })
      );
    } catch (error) {
      console.log('Error:', error);

      return [];
    }
  }
}
