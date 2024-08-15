import { FC, useState } from 'react';
import useVacancies from './use-vacancies/use-vacancies';
import { MESSAGES_TYPE } from '@get-vacancy/consts';
import Tabs from '../Tabs/Tabs';
import Vacancies from '../Vacancies/Vacancies';

const App: FC = () => {
  const { vacancies } = useVacancies();

  const [currentTab, setCurrentTab] = useState<string>(MESSAGES_TYPE.NEW_VACANCY);

  return (
    <div>
      <Tabs currentTab={currentTab} onChange={setCurrentTab}/>
      <Vacancies vacancies={vacancies.filter(({ messageType }) => messageType === currentTab)} />
    </div>
  );
};

export default App;