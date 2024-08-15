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
            title={<a href="https://ant.design">{item.name}</a>}
          />
        </List.Item>
      )}
    />
  );
};

export default Vacancies;
