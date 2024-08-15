import { useReducer } from 'react';
import { defaultContextValues, SettingsValuesKeys } from '../../../SettingsContext';

const LOCAL_STORAGE_KEY = 'VACANCY_WEB_APP';

const settingsFromLocalStorage = localStorage.getItem(LOCAL_STORAGE_KEY);

type Action = {
  type: 'SET_IS_USE_VOICE' | 'SET_IS_FETCH_OLD_VACANSIES';
  payload: boolean;
};

const reducer = (state: Record<SettingsValuesKeys, boolean>, action: Action) => {
  switch (action.type) {
    case 'SET_IS_USE_VOICE':
      return {
        ...state,
        isUseVoice: action.payload,
      };
    case 'SET_IS_FETCH_OLD_VACANSIES':
      return {
        ...state,
        isFetchOldVacansies: action.payload,
      };
    default:
      return state;
  }
};

const useSettings = () => {
  const [store, dispatch] = useReducer(reducer, settingsFromLocalStorage ? JSON.parse(settingsFromLocalStorage) : defaultContextValues);

  const makeChangeSettings = (type: Action['type']) => (payload: boolean) => {
    dispatch({ type, payload });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(reducer(store, { type, payload })));
  };

  return {
    isUseVoice: store.isUseVoice,
    isFetchOldVacansies: store.isFetchOldVacansies,
    setIsUseVoice: makeChangeSettings('SET_IS_USE_VOICE'),
    setIsFetchOldVacansies: makeChangeSettings('SET_IS_FETCH_OLD_VACANSIES'),
  };
};

export default useSettings;
