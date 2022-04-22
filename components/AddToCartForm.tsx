import { useState } from 'react';
import { useCart } from '../context/CartContext';
import s from '../styles/AddToCart.module.scss';
import Button from './Button';

type Props = {
  productId: number;
};
export function AddToCartForm({ productId }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { addLine } = useCart();
  const onClick = async () => {
    setLoading(true);
    const result = await addLine(productId, quantity);
    setLoading(false);
    if (!result || !result.ok) {
      setError(true);
    }
  };
  return (
    <>
      {' '}
      <div className={s.addtocart}>
        <div className={s.addtocart_select}>
          <input
            name="name"
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => {
              setQuantity(Number(e.target.value));
            }}
          />
        </div>
        <div className={s.addtocart_button}>
          <Button size="small" primary onClick={onClick}>
            {loading ? 'loading...' : 'Add to Cart'}
          </Button>
        </div>
      </div>
      {error && <p className={s.errorText}>Ekki tókst að setja vöru í körfu</p>}
    </>
  );
}
