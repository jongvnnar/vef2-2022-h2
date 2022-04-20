import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import MenuItemCard from '../../components/MenuItemCard';
import { Category } from '../../types/Category';
import { MenuItem } from '../../types/Menu';
import { PagedResponse } from '../../types/PagedResponse';
import s from '../../styles/Menu.module.scss';
import { useState } from 'react';

type Props = {
  menu: PagedResponse<MenuItem>;
  categories: PagedResponse<Category>;
};

const Menu: NextPage<Props> = ({ menu, categories }) => {
  let isprev = true;
  if (menu.offset == 0) {
    isprev = false;
  }
  let prevoffset = menu.offset - 12;
  let nextoffset = menu.offset + 12;
  return (
    <div>
      <Head>
        <title>Menu</title>
        <meta name="description" content="The restaurant's menu!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ul className={s.navbar}>
        {categories.items.map((value) => {
          return (
            <li key={value.id}>
              <Link href={`?category=${value.id}&limit=12`}>
                <a>{value.title}</a>
              </Link>
            </li>
          );
        })}
      </ul>
      {/* TODO útfæra search */}
      <section className={s.container}>
        {menu.items.map((value) => {
          return (
            <li key={value.id}>
              <Link href={`menu/${value.id}`}>
                <a>
                  <MenuItemCard product={value}></MenuItemCard>
                </a>
              </Link>
            </li>
          );
        })}
      </section>
      {/* TODO category tapast við notkun a next og prev link */}
      <div className={s.next}>
        {isprev ? (
          <Link href={`?limit=12&offset=${prevoffset}`}>
            <a>&#8249; Last Page</a>
          </Link>
        ) : (
          <p></p>
        )}
        <Link href={`?limit=12&offset=${nextoffset}`}>
          <a>Next Page &#8250;</a>
        </Link>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  // TODO limit 12 í upphafs fetchi
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
