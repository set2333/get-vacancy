import { render } from '@testing-library/react';

import Settings from './Settings';

describe('Settings', () => {
  it('should render successfully', () => {
    const result = render(<Settings />);
    expect(result.baseElement).toBeTruthy();
  });
});
