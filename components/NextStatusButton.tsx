import { useEffect, useState } from 'react';
import { useAuth } from '../context/Auth';
import { OrderState } from '../lib/order-state';
import { Order } from '../types/order';
import Button from './Button';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function NextStatusButton({ order }: { order: Order }) {
  const { authenticated, token, logoutUser } = useAuth();

  const [finalState, setFinalState] = useState(false);
  const [error, setError] = useState('');

  const getStatus = async () => {
    try {
      const result = await fetch(`${apiUrl}/orders/${order.id}/status`);

      if (!result.ok) {
        throw new Error('Results not ok');
      }

      const json = await result.json();
      const state: OrderState = OrderState.fromString(json[0]?.state);
      setFinalState(state === OrderState.finished);
      return state;
    } catch (e) {
      console.warn('Order update failed', e);
      setError('Order update failed');
      return;
    }
  };

  useEffect(() => {
    getStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!authenticated) {
    return <></>;
  }

  const updateStatus = async () => {
    setError('');

    const currentState = await getStatus();
    if (!currentState) return;
    setFinalState(
      currentState === OrderState.ready || currentState === OrderState.finished
    );
    if (currentState === OrderState.finished) return;
    const nextState = currentState?.getNextState();

    try {
      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: nextState.name,
        }),
      };
      const result = await fetch(
        `${apiUrl}/orders/${order.id}/status`,
        options
      );

      if (result.status === 401) {
        logoutUser();
      } else if (!result.ok) {
        throw new Error('Results not ok');
      }
    } catch (e) {
      console.warn('unable to update status', e);
      setError('Unable to update status');
    }
  };

  return (
    <div>
      <Button
        size="large"
        primary={true}
        onClick={updateStatus}
        disabled={finalState}
      >
        Next state
      </Button>
      {error ? <p>{error}</p> : <></>}
    </div>
  );
}
