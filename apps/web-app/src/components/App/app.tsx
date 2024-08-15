import { FC, useState } from 'react';
import { MESSAGES_TYPE } from '@get-vacancy/consts';
import Tabs from '../Tabs/Tabs';
import Vacancies from '../Vacancies/Vacancies';
import Settings from '../Settings/Settings';
import SettingsContext from '../../SettingsContext';
import useSettings from './use-settings/use-settings';
import useVacancies from './use-vacancies/use-vacancies';

const App: FC = () => {
  const { vacancies } = useVacancies();
  const [currentTab, setCurrentTab] = useState<string>(MESSAGES_TYPE.NEW_VACANCY);
  const settings = useSettings();

  return (
    <SettingsContext.Provider value={settings}>
      <Settings />
      <Tabs currentTab={currentTab} onChange={setCurrentTab}/>
      <Vacancies vacancies={vacancies.filter(({ messageType }) => currentTab === MESSAGES_TYPE.INITIAL || messageType === currentTab)} />
    </SettingsContext.Provider>
  );
};

export default App;