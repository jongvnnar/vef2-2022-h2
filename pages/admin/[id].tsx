import Head from 'next/head';
import { GetServerSideProps, NextPage } from 'next/types';
import { MenuItem } from '../../types/Menu';
import Image from 'next/image';
import styles from '../../styles/Product.module.scss';
import { formatPrice } from '../../lib/price-format';
import { formatDateString } from '../../lib/date-ops';
import { getPlaiceholder } from 'plaiceholder';
import Link from 'next/link';
import { useState } from 'react';
import Button from '../../components/Button';
import MenuItemForm from '../../components/MenuItemForm';
import { Category } from '../../types/Category';
import { useAuth } from '../../context/Auth';
import { LoginForm } from '../../components/LoginForm';

type Props = {
  product: MenuItem;
  blurredImg: {
    base64: string;
  };
  categories: Category[];
};
const AdminProduct: NextPage<Props> = ({
  product,
  blurredImg,
  categories,
}: Props) => {
  const { authenticated } = useAuth();

  if (!authenticated) {
    return (
      <>
        <Head>
          <title>{product.title} - Edit</title>
          <meta name="description" content="Product information" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <LoginForm />
      </>
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{product.title} - Edit</title>
        <meta name="description" content="Product information" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Link href={'/menu'}>
          <a>&#8249; Back to menu</a>
        </Link>
      </div>
      <div className={styles.details_container}>
        <MenuItemForm menuItem={product} categories={categories} />
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

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const menuItemUrl = new URL(`/menu/${id}`, apiUrl);
  const menuItemResponse = await fetch(menuItemUrl.toString());

  const categoryUrl = new URL(`/categories`, apiUrl);
  const categoryResponse = await fetch(categoryUrl.toString());

  // TODO finna út úr error handling
  if (!menuItemResponse.ok || !categoryResponse.ok) {
    return {
      notFound: true,
    };
  }

  const product: MenuItem = await menuItemResponse.json();
  const { base64 } = await getPlaiceholder(product.image, { size: 10 });
  const categories = (await categoryResponse.json()).items;
  return { props: { product, blurredImg: { base64 }, categories } };
};
export default AdminProduct;
