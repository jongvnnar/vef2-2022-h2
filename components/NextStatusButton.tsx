import { useState } from 'react';
import { useAuth } from '../context/Auth';
import { OrderState } from '../lib/order-state';
import { Order } from '../types/order';
import Button from './Button';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function NextStatusButton({ order }: { order: Order }) {
  const { authenticated, token } = useAuth();

  const [error, setError] = useState('');

  if (!authenticated) {
    return <></>;
  }

  const getStatus = async () => {
    try {
      const result = await fetch(`${apiUrl}/orders/${order.id}/status`);

      if (!result.ok) {
        throw new Error('Results not ok');
      }

      const json = await result.json();
      const state: OrderState = OrderState.fromString(json[0]?.state);
      return state;
    } catch (e) {
      console.warn('Order update failed', e);
      setError('Order update failed');
      return;
    }
  };

  const updateStatus = async () => {
    setError('');

    const currentState = await getStatus();
    if (!currentState) return;
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

      if (!result.ok) {
        throw new Error('Results not ok');
      }
    } catch (e) {
      console.warn('unable to fetch categories', e);
      setError('Unable to fetch categories');
    }
  };

  return (
    <div>
      <Button size="large" primary={true} onClick={updateStatus}>
        Next state
      </Button>
      {error ? <p>{error}</p> : <></>}
    </div>
  );
}
