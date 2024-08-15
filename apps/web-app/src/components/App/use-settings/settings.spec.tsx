import { act, renderHook } from '@testing-library/react';

import useSettings from './settings';

describe('useSettings', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useSettings());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
