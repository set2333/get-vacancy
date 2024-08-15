import { act, renderHook } from '@testing-library/react';

import useSettings from './use-settings';

describe('useSettings', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useSettings());
    expect(result.current.isUseVoice).toBe(true);
    expect(result.current.isFetchOldVacansies).toBe(true);
    expect(result.current.setIsUseVoice).toBeInstanceOf(Function);
    expect(result.current.setIsFetchOldVacansies).toBeInstanceOf(Function);

    act(() => {
      result.current.setIsUseVoice(false);
      result.current.setIsFetchOldVacansies(false);
    });

    expect(result.current.isUseVoice).toBe(false);
    expect(result.current.isFetchOldVacansies).toBe(false);
  });
});
