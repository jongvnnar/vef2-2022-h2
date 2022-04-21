import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/Auth';
import { Order } from '../types/order';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function OrderList() {
  const { token } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [orders, setOrders] = useState([]);

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

      if (!result.ok) {
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

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p>Error featching orders</p>;
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
      <div>
        <h2>{order.name}</h2>
        <p>{order.created}</p>
        <p>current state: {order.current_state}</p>
      </div>
    </Link>
  );
}
