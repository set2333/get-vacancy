import { IConfigurator } from '@get-vacancy/types';
import { parseRules, connectionPath, fetchDelay } from './config';

export class Configurator implements IConfigurator {
  get() {
    return { parseRules, connectionPath, fetchDelay };
  }
}
