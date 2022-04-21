import { useEffect, useState } from 'react';
import { useAuth } from '../context/Auth';

type WebsocketReturn<T> = {
  messages: T[];
  isError: boolean;
  error: string;
  connected: boolean;
};

type Error = {
  error?: string;
};

type LoginMessage = {
  status?: 'logged in';
};

type Headers = {
  Authorization?: string;
};
export function useWebsocket<T>(
  url: string,
  shouldReconnect: boolean = true,
  withAuth?: boolean,
  baseUrl?: string | URL
): WebsocketReturn<T> {
  const [connected, setConnected] = useState(false);
  const { token } = useAuth();
  const [error, setError] = useState('');
  const [isError, setIsError] = useState(false);
  const [messages, setMessages] = useState<T[]>([]);
  let headers: any = {};
  if (withAuth && token) {
    headers = { ['Authorization']: `Bearer ${token}` };
  }
  // note: in dev this updates each state twice. This is due to state updates being slow and
  // dev react calls useEffect twice when strict mode is set to true. This is not a problem in production.
  useEffect(() => {
    let ws: WebSocket | null = null;
    if (!connected && !ws && shouldReconnect && !error) {
      const wsURL = new URL(url, baseUrl || process.env.NEXT_PUBLIC_WS_URL);
      // @ts-ignore
      ws = new WebSocket(wsURL, null, {
        headers: {
          ['Authorization']: `Bearer ${token}`,
        },
      });
      ws.onopen = () => {
        setIsError(false);
        setError('');
        setConnected(true);
        if (withAuth && token) {
          ws?.send(token);
        }
      };
      ws.onmessage = (ev: MessageEvent<string>) => {
        const data: T & Error & LoginMessage = JSON.parse(ev.data);
        console.log(data);
        console.log(headers);
        if (data.error) {
          setIsError(true);
          setError(data.error);
        } else {
          setIsError(false);
          setError('');
          if (!(data.status === 'logged in')) {
            setMessages((messages) => [...messages, data]);
          }
        }
      };
      ws.onerror = (ev) => {
        setIsError(true);
        setError('Villa varð við tengingu');
      };
      ws.onclose = () => {
        setConnected(false);
      };
    }
    return () => {
      if (ws && connected) {
        ws.close();
        setConnected(false);
      }
    };
    // eslint-disable-next-line
  }, [connected, url, baseUrl, shouldReconnect]);

  return {
    messages,
    isError,
    error,
    connected,
  };
}
