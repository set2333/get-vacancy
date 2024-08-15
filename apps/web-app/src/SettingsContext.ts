import { createContext } from 'react';

export const defaultContextValues = {
  isUseVoice: true,
  isFetchOldVacansies: true,
};

const defauleContextSetters = {
  setIsUseVoice: (value: boolean) => {
    void(0);
  },
  setIsFetchOldVacansies: (value: boolean) => {
    void(0);
  },
};

const SettingsContext = createContext({
  ...defaultContextValues,
  ...defauleContextSetters,
});

export type SettingsValuesKeys = keyof typeof defaultContextValues;

export type SettingsSettersKeys = keyof typeof defauleContextSetters;

export default SettingsContext;
