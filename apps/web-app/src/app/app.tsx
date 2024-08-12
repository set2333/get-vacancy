// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect, useRef } from 'react';
import styles from './app.module.scss';



export function App() {
  const ws = useRef<WebSocket>(null);

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:8080')
    ws.current.onopen = () => {
      console.log(`???Open`)
    }
    ws.current.onmessage = (event) => {
      console.log('GET', event.data)
    }

    return () => {
      ws.current.close()
    }
  }, []);
  return (
    <div>
      TEST
    </div>
  );
}

export default App;
