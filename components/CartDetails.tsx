import { Cart } from '../types/Cart';
import CartLineDetails from './CartLineDetails';
import s from '../styles/CartDetails.module.scss';
import { formatPrice } from '../lib/price-format';
import Button from './Button';

type Props = {
  cart: Cart;
};

export default function CartDetails({ cart }: Props) {
  let totalPrice = 0;
  cart.lines.forEach((line) => {
    totalPrice += line.total;
  });

  return (
    <>
      <h2 className={s.cartQuantity}>
        {cart.lines.length} {cart.lines.length % 10 === 1 ? 'vara' : 'vörur'} í
        körfu
      </h2>
      <div className={s.cartHeader}>
        <p className={s.title}>Vara</p>
        <p className={s.desc}>Lýsing</p>
        <p className={s.right}>Einingarverð</p>
        <p className={s.right}>Fjöldi</p>
        <p className={s.right}>Línuverð</p>
        <div className={s.delete}></div>
      </div>
      {cart?.lines &&
        cart.lines?.map((item, i) => <CartLineDetails key={i} line={item} />)}
      <p className={s.cartTotal}>Heildarverð: {formatPrice(totalPrice)}</p>
      <div className={s.mainActions}>
        <Button size="large" primary={false}>
          Hreinsa körfu
        </Button>
        <Button size="large" primary={true}>
          Panta
        </Button>
      </div>
    </>
  );
}
