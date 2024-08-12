import { act, renderHook } from '@testing-library/react';

import useVacancies from './use-vacancies';

describe('useVacancies', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useVacancies());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
