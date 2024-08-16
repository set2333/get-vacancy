import { FetchedData, IFetcher, Rule } from '@get-vacancy/types';

export class Fetcher implements IFetcher {
  constructor(private rules: Rule[]) {}

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
