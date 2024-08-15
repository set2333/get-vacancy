import { render } from '@testing-library/react';

import Settings from './Settings';

describe('Settings', () => {
  it('should render successfully', () => {
    const result = render(<Settings />);
console.log(`???result`, result)
    expect(result.baseElement).toBeTruthy();
  });
});
