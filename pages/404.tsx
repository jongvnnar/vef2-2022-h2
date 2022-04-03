import type { NextPage } from "next";
import Head from "next/head";

const NotFound: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Síða fannst ekki</title>
        <meta name="description" content="fannst ekki fyrir appið okkar" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>404: Síða fannst ekki</div>
    </div>
  );
};

export default NotFound;
