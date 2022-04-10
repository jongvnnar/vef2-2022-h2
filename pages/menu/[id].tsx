import Head from 'next/head';
import { NextPage } from 'next/types';

const Product: NextPage = () => {
  return (
    <>
      <Head>
        <title>Vara</title>
        <meta name="description" content="Upplýsingar um vöru" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>Vara</div>
    </>
  );
};

export default Product;
