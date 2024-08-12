import { exec } from 'child_process';
import { Consumer, MESSAGES_TYPE } from '@get-vacancy/consumer'

const consumer = new Consumer(() =>  exec(`say "Есть новые вакансии"`), [MESSAGES_TYPE.NEW_VACANCY]);

consumer.run();