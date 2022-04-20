import { Cart } from '../types/Cart';
import CartLineDetails from './CartLineDetails';
import s from '../styles/CartDetails.module.scss';
import { formatPrice } from '../lib/price-format';
import Button from './Button';
import { useCart } from '../context/CartContext';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useRouter } from 'next/router';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

type Props = {
  cart: Cart;
};

type Error = {
  location: string;
  msg: string;
  param: string;
  value: string;
};

export default function CartDetails({ cart }: Props) {
  const { deleteCart } = useCart();

  const router = useRouter();

  const [name, setName] = useState('');
  const [isNameError, setNameError] = useState(false);
  const [sum, setSum] = useState<number>(
    cart.lines.reduce((agg, line) => agg + line.total, 0)
  );

  useEffect(() => {
    setSum(cart.lines.reduce((agg, line) => agg + line.total, 0));
  }, [cart]);

  const placeOrder = async () => {
    setNameError(false);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cart: cart.id,
        name,
      }),
    };
    const result = await fetch(`${apiUrl}/orders`, options);
    const response = await result.json();

    if (result.ok) {
      router.push(`/orders/${response.id}`);
      //deleteCart();
    } else if (result.status === 400) {
      if (response?.errors?.some((e: Error) => e.param === 'name')) {
        setNameError(true);
      }
    }
  };

  return (
    <>
      <h2 className={s.cartQuantity}>
        {cart.lines.length}{' '}
        {cart.lines.length % 10 === 1 ? 'product' : 'products'} in cart
      </h2>
      <div className={s.cartHeader}>
        <p className={s.title}>Product</p>
        <p className={s.desc}>Description</p>
        <p className={s.right}>Price</p>
        <p className={s.right}>Quantity</p>
        <p className={s.right}>Total price</p>
        <div className={s.delete}></div>
      </div>
      {cart?.lines &&
        cart.lines?.map((item, i) => (
          <CartLineDetails key={item.id} line={item} />
        ))}
      <p className={s.cartTotal}>Order total price: {formatPrice(sum)}</p>
      <div className={s.orderName}>
        <label htmlFor="order-name">Enter name for order:</label>
        <div>
          <input
            id="order-name"
            type="text"
            value={name}
            className={classNames({ [s.error]: isNameError })}
            onChange={(e) => setName(e.target.value)}
          ></input>
          {isNameError ? (
            <p className={s.errorLabel}>Name is required</p>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className={s.mainActions}>
        <Button size="large" primary={false} onClick={deleteCart}>
          Clear cart
        </Button>
        <Button size="large" primary={true} onClick={placeOrder}>
          Place order
        </Button>
      </div>
    </>
  );
}
