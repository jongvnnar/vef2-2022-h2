import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import AdminDashboard from '../../components/AdminDashboard';
import { LoginForm } from '../../components/LoginForm';
import OrderList from '../../components/OrderList';
import { useAuth } from '../../context/Auth';

const Orders: NextPage = () => {
  const { authenticated } = useAuth();
  const router = useRouter();

  if (!authenticated) {
    return (
      <>
        <Head>
          <title>Manage Orders</title>
          <meta name="description" content="Product information" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <LoginForm />
      </>
    );
  }

  return (
    <div>
      <Head>
        <title>Manage Orders</title>
        <meta name="description" content="Make changes!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1>Orders</h1>
        <OrderList />
      </div>
    </div>
  );
};

export default Orders;
