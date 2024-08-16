import { connectionPath, fetchDelay, parseRules } from './config';
import { Configurator } from './configurator';

describe('Configurator', () => {
  const configurator = new Configurator();
  it('should work', () => {
    expect(configurator.get()).toEqual({ parseRules, connectionPath, fetchDelay });
  });
});
