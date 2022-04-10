import type { NextPage } from 'next';
import Head from 'next/head';

const Menu: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Menu</title>
        <meta name="description" content="The restaurant's menu!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>Menu</div>
    </div>
  );
};

export default Menu;
