import type { NextPage } from 'next';
import Head from 'next/head';
import AdminDashboard from '../../components/AdminDashboard';
import { LoginForm } from '../../components/LoginForm';
import OrderList from '../../components/OrderList';
import { useAuth } from '../../context/Auth';

const Orders: NextPage = () => {
  const { authenticated } = useAuth();

  if (!authenticated) {
    return <></>;
  }

  return (
    <div>
      <Head>
        <title>Orders</title>
        <meta name="description" content="Make changes!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1>Pantanir</h1>
        <OrderList />
      </div>
    </div>
  );
};

export default Orders;
