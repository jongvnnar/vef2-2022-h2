import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import CartDetails from '../components/CartDetails';
import { useCart } from '../context/CartContext';
import { Cart } from '../types/Cart';
import s from '../styles/Cart.module.scss';
import Image from 'next/image';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const Cart: NextPage = () => {
  const { cartId } = useCart();

  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      if (!cartId) return;
      setLoading(true);
      setError('');

      let json;
      try {
        const result = await fetch(`${apiUrl}/cart/${cartId}`);

        if (result.status === 404) {
          return;
        }

        if (!result.ok) {
          throw new Error('Results not ok');
        }

        json = await result.json();
      } catch (e) {
        console.warn('unable to fetch cart', e);
        setError('Gat ekki sótt körfu');
        return;
      } finally {
        setLoading(false);
      }
      setCart(json);
    }
    fetchData();
  }, [cart, cartId]);

  if (error) {
    return (
      <div>
        <Head>
          <title>Karfa</title>
          <meta name="description" content="Karfa fyrir appið okkar" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <section>
          <h1>Karfan þín</h1>
          <div className={s.emptyCart}>
            <h2>Villa kom upp</h2>
            <p>{error}</p>
            <Image src="/cart_icon.svg" width={100} height={100} alt="" />
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>Karfa</title>
        <meta name="description" content="Karfa fyrir appið okkar" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section>
        <h1>Karfan þín</h1>
        {cart && cart?.lines.length > 0 ? (
          <CartDetails cart={cart} />
        ) : (
          <div className={s.emptyCart}>
            <h2>Karfan þín er tóm</h2>
            <p>
              Bættu vörum í körfu með því að skoða{' '}
              <Link href="/menu">matseðilinn</Link>.
            </p>
            <Image src="/cart_icon.svg" width={100} height={100} alt="" />
          </div>
        )}
      </section>
    </div>
  );
};

export default Cart;
