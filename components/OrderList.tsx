import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/Auth';
import { Order } from '../types/order';
import s from '../styles/OrderList.module.scss';
import { OrderState } from '../lib/order-state';
import { StateEnum, StateNameEnum } from '../types/state';
import { formatDateString, getDateFromAPI } from '../lib/date-ops';
import { useWebsocket } from '../lib/websocket-hooks';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function OrderList() {
  const { token, logoutUser } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);

  async function fetchData() {
    setLoading(true);
    setError('');

    let json;

    try {
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const result = await fetch(`${apiUrl}/orders`, options);

      if (result.status === 401) {
        logoutUser();
      } else if (!result.ok) {
        throw new Error('Results not ok');
      }

      json = await result.json();
    } catch (e) {
      console.warn('unable to fetch categories', e);
      setError('Unable to fetch categories');
      return;
    } finally {
      setLoading(false);
    }

    setOrders(json?.items || []);
  }

  const { messages } = useWebsocket<Order>('/admin', true, true);
  useEffect(() => {
    messages.forEach((value) => {
      if (orders.find((order) => order.id === value.id)) {
        setOrders((orders) =>
          orders.map((order) => {
            if (order.id === value.id) {
              return value;
            }
            return order;
          })
        );
      } else {
        setOrders((orders) => [value, ...orders]);
      }
    });
  }, [messages]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p>Error fetching orders</p>;
  }

  return (
    <div>
      {orders.length !== 0 ? (
        <div>
          {orders.map((item: Order) => (
            <OrderListItem key={item.id} order={item} />
          ))}
        </div>
      ) : (
        <p>No orders</p>
      )}
    </div>
  );
}

function OrderListItem({ order }: { order: Order }) {
  return (
    <Link href={`/orders/${order.id}`} passHref>
      <div className={s.orderItem}>
        <h2>{order.name}</h2>
        <div>
          <div className={s.orderCreated}>
            <p>Order created:</p>
            <p>{formatDateString(order.created)}</p>
          </div>
          <div className={s.orderState}>
            <div>
              <p>Current state:</p>
              <strong>{order.current_state}</strong>
            </div>
            <div>
              <p>Last updated:</p>
              <p>{formatDateString(order.current_state_created)}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
