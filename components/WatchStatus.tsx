import { useEffect, useState } from 'react';
import { Order, StateLine } from '../types/order';
import { State, StateProps } from './State';
import styles from '../styles/WatchStatus.module.scss';
import { StateEnum } from '../types/state';

type Props = { id: string | string[]; initialStates: StateLine[] };
export function WatchStatus({ id, initialStates }: Props): JSX.Element {
  const [connected, setConnected] = useState(false);

  const [states, setStates] = useState<StateProps[]>(
    Object.values(StateEnum).map((val) => {
      return { state: val };
    })
  );

  useEffect(() => {
    // set states found in initialStates as finished
    setStates((states) =>
      states.map((val) => {
        if (initialStates.map(({ state }) => state).includes(val.state)) {
          return { ...val, finished: true };
        }
        return val;
      })
    );
    // eslint-disable-next-line
  }, []);

  // note: in dev this updates each state twice. This is due to state updates being slow and
  // dev react calls useEffect twice when strict mode is set to true. This is not a problem in production.
  useEffect(() => {
    let ws: WebSocket | null = null;
    if (
      !connected &&
      !ws &&
      !states.find(
        (state) => state.state === StateEnum.finished && state.finished
      )
    ) {
      const url = new URL(`/orders/${id}`, process.env.NEXT_PUBLIC_WS_URL);
      ws = new WebSocket(url);
      ws.onopen = () => {
        setConnected(true);
      };
      ws.onmessage = (ev: MessageEvent<string>) => {
        const data: Order | { status: StateEnum } = JSON.parse(ev.data);
        const { status } = data;
        if (status && !Array.isArray(status)) {
          setStates((states) =>
            states.map((val) => {
              if (val.state === status) {
                return { ...val, finished: true };
              }
              return val;
            })
          );
        }
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
  }, [connected]);

  return (
    <div className={styles.container}>
      <h1>Stöður pöntunar</h1>
      <div className={styles.state_container}>
        {states.map((state) => (
          <State
            key={state.state}
            state={state.state}
            finished={state.finished}
          />
        ))}
      </div>
    </div>
  );
}
