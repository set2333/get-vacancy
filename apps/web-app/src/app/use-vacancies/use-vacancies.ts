import { useEffect, useRef, useState } from 'react';
import { MESSAGES_TYPE } from '@get-vacancy/consts';
import type { WSMessage } from '@get-vacancy/types';

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

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:8080');
    ws.current.onmessage = (event) => {
      const message: WSMessage = JSON.parse(event.data);
      setVacancies((prev) => [...prev, message]);

      if (message.messageType === MESSAGES_TYPE.NEW_VACANCY) {
        speak('Есть новые вакансии');
      }
      
    };

    return () => {
      ws.current?.close();
    };
  }, []);

  return { vacancies };
}

export default useVacancies;
