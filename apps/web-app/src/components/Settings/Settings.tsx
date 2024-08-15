import { FC, useContext, useState } from 'react';
import { Button, Drawer, Switch } from 'antd';
import SettingsContext, {
  SettingsValuesKeys,
  SettingsSettersKeys,
} from '../../SettingsContext';
import styles from './styles.module.scss';

const Settings: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ctx = useContext(SettingsContext);

  const switches: {
    key: SettingsValuesKeys;
    setterKey: SettingsSettersKeys;
    label: string;
  }[] = [
    {
      key: 'isUseVoice',
      setterKey: 'setIsUseVoice',
      label: 'Использовать голосовое оповещение',
    },
    {
      key: 'isFetchOldVacansies',
      setterKey: 'setIsFetchOldVacansies',
      label: 'Загружать старые вакансии',
    },
  ];

  return (
    <div className={styles.settings}>
      <Button type="primary" onClick={() => setIsOpen((prev) => !prev)}>
        Настройки
      </Button>
      <Drawer
        title="Настройки"
        open={isOpen}
        placement="left"
        onClose={() => setIsOpen(false)}
      >
        {switches.map(({ key, setterKey, label }) => (
          <div key={key} className={styles.switch}>
            {label}
            <Switch
              checked={!!ctx[key]}
              onChange={() => ctx[setterKey](!ctx[key])}
            />
          </div>
        ))}
      </Drawer>
    </div>
  );
};

export default Settings;
