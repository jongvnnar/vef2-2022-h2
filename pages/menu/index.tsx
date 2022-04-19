import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Category } from '../../types/Category';
import { MenuItem } from '../../types/Menu';
import { PagedResponse } from '../../types/PagedResponse';

type Props = {
  menu: PagedResponse<MenuItem>;
  categories: PagedResponse<Category>;
};
const Menu: NextPage<Props> = ({ categories }) => {
  return (
    <div>
      <Head>
        <title>Menu</title>
        <meta name="description" content="The restaurant's menu!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/** Dæmi um að skipta um categories */}
      {categories.items.map((value) => {
        return (
          <li key={value.id}>
            <Link href={`?category=${value.id}`}>
              <a>{value.title}</a>
            </Link>
          </li>
        );
      })}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const menuUrl = new URL(context.resolvedUrl, process.env.NEXT_PUBLIC_API_URL);
  const menuResponse = await fetch(menuUrl.toString());
  const categoryUrl = new URL('categories', process.env.NEXT_PUBLIC_API_URL);
  const categoryResponse = await fetch(categoryUrl.toString());
  const categories: PagedResponse<Category> = await categoryResponse.json();
  const menu: PagedResponse<MenuItem> = await menuResponse.json();
  return {
    props: { menu, categories },
  };
};

export default Menu;
