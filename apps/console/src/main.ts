import { Consumer, MESSAGES_TYPE } from '@get-vacancy/consumer'

let outTime = new Date().toLocaleTimeString();

const consumer = new Consumer((msg) => {
  const time = new Date().toLocaleTimeString();

  if (time !== outTime) {
    console.log(`----- ${time} -----`);
    outTime = time;
  }

  const { name, url } = JSON.parse(msg.content.toString());
  console.log(name, url);
}, [MESSAGES_TYPE.INITIAL, MESSAGES_TYPE.NEW_VACANCY]);

consumer.run();
