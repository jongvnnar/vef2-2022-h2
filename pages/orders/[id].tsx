import type { GetStaticPaths, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

const Order: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <Head>
        <title>Skoða pöntun</title>
        <meta name="description" content="Pöntun fyrir appið okkar" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>Pöntun {id}</div>
    </div>
  );
};

export default Order;
