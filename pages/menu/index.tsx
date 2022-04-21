import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import MenuItemCard from '../../components/MenuItemCard';
import { Category } from '../../types/Category';
import { MenuItem } from '../../types/Menu';
import { PagedResponse } from '../../types/PagedResponse';
import s from '../../styles/Menu.module.scss';
import { useRouter } from 'next/router';
import { createQuery } from '../../lib/query-ops';

type Props = {
  menu: PagedResponse<MenuItem>;
  categories: PagedResponse<Category>;
};

const Menu: NextPage<Props> = ({ menu, categories }) => {
  const router = useRouter();
  const url = new URLSearchParams(createQuery(router.query));

  const linkPrevPage = () => {
    if (!menu._links.prev) return <></>;
    const prevLink = new URL(menu._links.prev.href);
    const prevUrl = new URLSearchParams(url);
    prevUrl.set('limit', prevLink.searchParams.get('limit') || '12');
    prevUrl.set('offset', prevLink.searchParams.get('offset') || '0');
    return (
      <Link href={`?${prevUrl.toString()}`}>
        <a>&#8249; Last Page</a>
      </Link>
    );
  };

  const linkNextPage = () => {
    if (!menu._links.next) return <></>;
    const nextLink = new URL(menu._links.next.href);
    const nextUrl = new URLSearchParams(url);
    nextUrl.set('limit', nextLink.searchParams.get('limit') || '12');
    nextUrl.set('offset', nextLink.searchParams.get('offset') || '0');
    return (
      <Link href={`?${nextUrl.toString()}`}>
        <a>Next Page &#8250;</a>
      </Link>
    );
  };

  return (
    <div>
      <Head>
        <title>Menu</title>
        <meta name="description" content="The restaurant's menu!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ul className={s.navbar}>
        {categories.items.map((value) => {
          const categoryUrl = new URLSearchParams(url);
          categoryUrl.set('category', value.id.toString());
          return (
            <li key={value.id}>
              <Link href={`?${categoryUrl.toString()}`}>
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
      <div className={s.next}>
        {linkPrevPage()}
        {linkNextPage()}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const menuUrl = new URL(context.resolvedUrl, process.env.NEXT_PUBLIC_API_URL);
  if (!context.query.limit) {
    menuUrl.searchParams.set('limit', '12');
  }
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
