import type { NextPage } from 'next';
import Head from 'next/head';

const Admin: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Administration</title>
        <meta name="description" content="Make changes!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>Administration</div>
    </div>
  );
};

export default Admin;
