import { FC } from 'react';
import { Tabs as AntdTabs, TabsProps as AntdTabsProps } from 'antd';
import { MESSAGES_TYPE } from '@get-vacancy/consts';

type TabsProps = {
  currentTab: AntdTabsProps['activeKey'];
  onChange: AntdTabsProps['onChange'];
}

const Tabs: FC<TabsProps> = ({ currentTab, onChange }) => {
  const items: AntdTabsProps['items'] = [
    {
      key: MESSAGES_TYPE.NEW_VACANCY,
      label: 'Новые'
    },
    {
      key: MESSAGES_TYPE.INITIAL,
      label: 'Все'
    },
  ];

  return (
    <AntdTabs
      activeKey={currentTab}
      items={items}
      onChange={onChange}
    />
  );
};

export default Tabs;
