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
        {cart.lines.length} {cart.lines.length % 10 === 1 ? 'vara' : 'vörur'} í
        körfu
      </h2>
      <div className={s.cartHeader}>
        <p className={s.title}>Vara</p>
        <p className={s.desc}>Lýsing</p>
        <p className={s.right}>Verð</p>
        <p className={s.right}>Fjöldi</p>
        <p className={s.right}>Heildarverð</p>
        <div className={s.delete}></div>
      </div>
      {cart?.lines &&
        cart.lines?.map((item, i) => <CartLineDetails key={item.id} line={item} />)}
      <p className={s.cartTotal}>Heildarverð: {formatPrice(sum)}</p>
      <div className={s.mainActions}>
        <Button size="large" primary={false} onClick={() => deleteCart()}>
          Hreinsa körfu
        </Button>
        <Button size="large" primary={true}>
          Panta
        </Button>
      </div>
    </>
  );
}
