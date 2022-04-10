import type { NextPage } from 'next';
import Head from 'next/head';

const Menu: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Matseðill</title>
        <meta name="description" content="Matseðill fyrir appið okkar" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>Matseðill</div>
    </div>
  );
};

export default Menu;
