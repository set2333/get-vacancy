import { exec } from 'child_process';
import { Consumer } from '@get-vacancy/consumer';
import { MESSAGES_TYPE } from '@get-vacancy/consts';

const consumer = new Consumer(() => exec(
  'osascript -e \'display notification "Есть новые вакансии" with title "Есть новые вакансии"\';'
), [MESSAGES_TYPE.NEW_VACANCY]);

consumer.run();
