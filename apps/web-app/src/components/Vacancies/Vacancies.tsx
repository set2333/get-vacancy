import { FC } from 'react';
import { List } from 'antd';
import { MESSAGES_TYPE } from '@get-vacancy/consts';
import useVacancies from './use-vacancies/use-vacancies';

type VacanciesProps = {
  currentTab: string;
}

const Vacancies: FC<VacanciesProps> = ({ currentTab }) => {
  const { vacancies } = useVacancies();

  return (
    <List
      dataSource={vacancies.filter(({ messageType }) => currentTab === MESSAGES_TYPE.INITIAL || messageType === currentTab)}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            title={<a href={item.url} target="_blank" rel="noreferrer">{item.name}</a>}
          />
        </List.Item>
      )}
    />
  );
};

export default Vacancies;
