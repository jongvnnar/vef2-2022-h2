import type { NextPage } from 'next';
import Head from 'next/head';

const NotFound: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Page not found</title>
        <meta name="description" content="404 page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>404: Page not found</div>
    </div>
  );
};

export default NotFound;
