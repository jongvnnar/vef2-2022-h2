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
      if (!cartId) {
        setCart(null);
        return;
      }
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
        setError('Unable to fetch cart');
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
          <title>Cart</title>
          <meta name="description" content="Karfa fyrir appið okkar" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <section>
          <h1>Your cart</h1>
          <div className={s.emptyCart}>
            <h2>Error</h2>
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
        <title>Cart</title>
        <meta name="description" content="Karfa fyrir appið okkar" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section>
        <h1>Your cart</h1>
        {cart && cart?.lines.length > 0 ? (
          <CartDetails cart={cart} />
        ) : (
          <div className={s.emptyCart}>
            <h2>Your cart is empty</h2>
            <p>
              Add products to your cart from the <Link href="/menu">menu</Link>.
            </p>
            <Image src="/cart_icon.svg" width={100} height={100} alt="" />
          </div>
        )}
      </section>
    </div>
  );
};

export default Cart;
