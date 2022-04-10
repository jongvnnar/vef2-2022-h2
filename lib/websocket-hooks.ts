import { useEffect, useState } from 'react';

type WebsocketReturn<T> = {
  messages: T[];
  isError: boolean;
  error: string;
  connected: boolean;
};

type Error = {
  error?: string;
};
export function useWebsocket<T>(
  url: string,
  shouldReconnect: boolean = true,
  withAuth?: boolean,
  baseUrl?: string | URL
): WebsocketReturn<T> {
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState('');
  const [isError, setIsError] = useState(false);
  const [messages, setMessages] = useState<T[]>([]);

  // note: in dev this updates each state twice. This is due to state updates being slow and
  // dev react calls useEffect twice when strict mode is set to true. This is not a problem in production.
  useEffect(() => {
    let ws: WebSocket | null = null;
    if (!connected && !ws && shouldReconnect && !error) {
      const wsURL = new URL(url, baseUrl || process.env.NEXT_PUBLIC_WS_URL);
      ws = new WebSocket(wsURL);
      ws.onopen = () => {
        setIsError(false);
        setError('');
        setConnected(true);
      };
      ws.onmessage = (ev: MessageEvent<string>) => {
        const data: T & Error = JSON.parse(ev.data);
        if (data.error) {
          setIsError(true);
          setError(data.error);
        } else {
          setIsError(false);
          setError('');
          setMessages((messages) => [...messages, data]);
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
