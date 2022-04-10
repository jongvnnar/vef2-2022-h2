import Head from 'next/head';
import { GetServerSideProps, NextPage } from 'next/types';
import { MenuItem } from '../../types/Menu';
import Image from 'next/image';
import styles from '../../styles/Product.module.scss';
import { formatPrice } from '../../lib/price-format';
import { formatDateString } from '../../lib/date-ops';
import { getPlaiceholder } from 'plaiceholder';

type Props = {
  product: MenuItem;
  blurredImg: {
    base64: string;
  };
};
const Product: NextPage<Props> = ({ product, blurredImg }: Props) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>{product.title}</title>
        <meta name="description" content="Product information" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.heading_container}>
        <h1>{product.title}</h1>
      </div>
      <div className={styles.image_container}>
        <Image
          alt={`Image of ${product.title}`}
          src={product.image}
          placeholder="blur"
          blurDataURL={blurredImg.base64}
          layout="fill"
          objectFit="contain"
          objectPosition={'left center'}
        />
      </div>
      <div className={styles.details_container}>
        <h2>Description</h2>
        <p>{product.description}</p>
        <h2>Price</h2>
        <p>{formatPrice(product.price)}</p>
        {/* TODO category names */}
        <h2>Category</h2>
        <p>{product.category}</p>
        <h2>Created</h2>
        <p>{formatDateString(product.created)}</p>
        <h2>Last updated</h2>
        <p>{formatDateString(product.updated)}</p>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { id = '' } = context.params || {};
  if (!id || typeof id !== 'string') {
    return { notFound: true };
  }
  const url = new URL(`/menu/${id}`, process.env.NEXT_PUBLIC_API_URL);
  const response = await fetch(url.toString());

  // TODO finna út úr error handling
  if (!response.ok) {
    return {
      notFound: true,
    };
  }

  const product: MenuItem = await response.json();
  const { base64 } = await getPlaiceholder(product.image, { size: 10 });
  return { props: { product, blurredImg: { base64 } } };
};
export default Product;
