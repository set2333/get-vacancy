import { FC } from 'react';
import { List } from 'antd';
import { WSMessage } from '@get-vacancy/types';

type VacanciesProps = {
  vacancies: WSMessage[];
}

const Vacancies: FC<VacanciesProps> = ({ vacancies }) => {
  return (
    <List
      dataSource={vacancies}
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
