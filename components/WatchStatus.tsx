import { useEffect, useState } from 'react';
import { Order, StateLine } from '../types/order';
import { State, StateProps } from './State';
import styles from '../styles/WatchStatus.module.scss';
import { StateEnum } from '../types/state';
import { useWebsocket } from '../lib/websocket-hooks';

type Props = { id: string | string[]; initialStates: StateLine[] };
type StatusMessage = { status: StateEnum };

export function WatchStatus({ id, initialStates }: Props): JSX.Element {
  const [states, setStates] = useState<StateProps[]>(
    Object.values(StateEnum).map((val) => {
      return { state: val };
    })
  );

  const [shouldConnect, setShouldConnect] = useState(false);

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
    if (!initialStates.map(({ state }) => state).includes(StateEnum.finished)) {
      setShouldConnect(true);
    }
    // eslint-disable-next-line
  }, []);

  const { messages, isError, error, connected } = useWebsocket<
    StatusMessage | Order
  >(`/orders/${id}`, shouldConnect);

  useEffect(() => {
    messages.forEach((message) => {
      const { status } = message;
      if (!Array.isArray(status)) {
        if (status === StateEnum.finished) {
          setShouldConnect(false);
        }
        setStates((states) =>
          states.map((state) => {
            if (state.state === status) {
              return { ...state, finished: true };
            }
            return state;
          })
        );
      }
    });
  }, [messages]);

  const connectMessage = () => {
    if (shouldConnect) {
      if (!connected) {
        return 'Beðið er eftir tengingu';
      } else {
        return 'Verið er að fylgjast með breytingum';
      }
    }
    return 'Ekki er verið að fylgjast með breytingum';
  };
  return (
    <>
      <h2>Staða pöntunar</h2>
      <p>{connectMessage()}</p>
      <div className={styles.state_container}>
        {states.map((state) => (
          <State
            key={state.state}
            state={state.state}
            finished={state.finished}
          />
        ))}
        {isError && <p>{error}</p>}
      </div>
    </>
  );
}
