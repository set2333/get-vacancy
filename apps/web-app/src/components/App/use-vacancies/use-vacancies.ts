import { useContext, useEffect, useRef, useState } from 'react';
import { MESSAGES_TYPE } from '@get-vacancy/consts';
import type { WSMessage } from '@get-vacancy/types';
import SettingsContext from '../../../SettingsContext';

let voices = speechSynthesis.getVoices();
    
speechSynthesis.onvoiceschanged = () => {
  voices = speechSynthesis.getVoices();
};

const speak = (text: string) => {
  const voice = voices.find(({ name }) => name === 'Милена');

  if (voice) {
    const U = new SpeechSynthesisUtterance();
    U.onerror = (err) => console.error(err);
    U.text = text;
    U.voice = voice;
    U.lang = voice?.lang;
    U.volume = 1;
    U.rate = 1;
    U.pitch = 1;
    speechSynthesis.speak(U);
  }
};

export function useVacancies() {
  const ws = useRef<WebSocket>();
  const [vacancies, setVacancies] = useState<WSMessage[]>([]);
  const ctx = useContext(SettingsContext);

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:8080');
    ws.current.onmessage = (event) => {
      const pasdedData: WSMessage | WSMessage[] = JSON.parse(event.data);
      const messages: WSMessage[] = Array.isArray(pasdedData) ? pasdedData : [pasdedData];
      setVacancies((prev) => [...prev, ...messages]);

      if (ctx .isUseVoice && messages.some(({ messageType }) => messageType === MESSAGES_TYPE.NEW_VACANCY)) {
        speak('Есть новые вакансии');
      }
    };

    ws.current.onopen = () => {
      if (ctx.isFetchOldVacansies) {
        ws?.current?.send('get all messages');
      }
    };
    

    return () => {
      ws.current?.close();
    };
  }, [ctx.isFetchOldVacansies, ctx.isUseVoice]);

  return { vacancies };
}

export default useVacancies;
