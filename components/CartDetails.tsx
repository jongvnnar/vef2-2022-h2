import { Cart } from '../types/Cart';
import CartLineDetails from './CartLineDetails';
import s from '../styles/CartDetails.module.scss';
import { formatPrice } from '../lib/price-format';
import Button from './Button';
import { useCart } from '../context/CartContext';
import { useEffect, useState } from 'react';

type Props = {
  cart: Cart;
};

export default function CartDetails({ cart }: Props) {
  const { deleteCart } = useCart();

  const [sum, setSum] = useState<number>(
    cart.lines.reduce((agg, line) => agg + line.total, 0)
  );

  useEffect(() => {
    setSum(cart.lines.reduce((agg, line) => agg + line.total, 0));
  }, [cart]);

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
      <div className={s.mainActions}>
        <Button size="large" primary={false} onClick={deleteCart}>
          Clear cart
        </Button>
        <Button size="large" primary={true}>
          Place order
        </Button>
      </div>
    </>
  );
}
