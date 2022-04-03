import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Forsíða</title>
        <meta name="description" content="Forsíða fyrir appið okkar" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>Forsíða</div>
    </div>
  );
};

export default Home;
