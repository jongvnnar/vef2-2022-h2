import type { GetServerSideProps, GetStaticPaths, NextPage } from 'next';
import Head from 'next/head';
import { Error } from '../../types/Error';
import { Order } from '../../types/order';
import styles from '../../styles/Order.module.scss';
import { useRouter } from 'next/router';
import { WatchStatus } from '../../components/WatchStatus';
import { formatDateString } from '../../lib/date-ops';
import { OrderDetails } from '../../components/OrderDetails';
import NextStatusButton from '../../components/NextStatusButton';
import { Input } from '../../components/Input';
import { useState } from 'react';
type Props = {
  order: Order;
};
const Order: NextPage<Props> = ({ order }) => {
  const router = useRouter();
  const { id = '' } = router.query;
  return (
    <div className={styles.container}>
      <Head>
        <title>{order.name}</title>
        <meta name="description" content="Order information" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.heading_container}>
        <h1>Order</h1>
        <h3>{order.name}</h3>
        <h3>Order received at {formatDateString(order.created)}</h3>
      </div>
      <div className={styles.state_container}>
        <WatchStatus id={id} initialStates={order.status} />
        <NextStatusButton order={order} />
      </div>
      <div className={styles.details_container}>
        <h2>Order information</h2>
        <OrderDetails lines={order.lines} />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { id = '' } = context.params || {};
  if (!id || typeof id !== 'string') {
    return { notFound: true };
  }
  const url = new URL(`/orders/${id}`, process.env.NEXT_PUBLIC_API_URL);
  const response = await fetch(url.toString());

  // TODO finna út úr error handling
  if (!response.ok) {
    return {
      notFound: true,
    };
  }

  const order: Order = await response.json();

  return { props: { order } };
};
export default Order;
