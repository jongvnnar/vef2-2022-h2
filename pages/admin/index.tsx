import type { NextPage } from 'next';
import Head from 'next/head';
import AdminDashboard from '../../components/AdminDashboard';
import { LoginForm } from '../../components/LoginForm';
import { useAuth } from '../../context/Auth';

const Admin: NextPage = () => {
  const { authenticated } = useAuth();

  return (
    <div>
      <Head>
        <title>Administration</title>
        <meta name="description" content="Make changes!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>{authenticated ? <AdminDashboard /> : <LoginForm />}</div>
    </div>
  );
};

export default Admin;
