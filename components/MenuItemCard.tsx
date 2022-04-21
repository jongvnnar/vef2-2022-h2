import Image from 'next/image';
import { MenuItem } from '../types/Menu';
import Button from './Button';
import Link from 'next/link';
import s from '../styles/MenuItemCard.module.scss';
import { useState } from 'react';
import { useCart } from '../context/CartContext';


type Props = {
  product: MenuItem;
};

export default function MenuItemCard({ product }: Props) {
  const [quantity, setQuantity] = useState(1);
  const { addLine } = useCart();
  return (
    <div className={s.card}>
      <Link href={`menu/${product.id}`}>
        <a>
          <div>
            <Image
              className={s.image}
              alt={`Image of ${product.title}`}
              src={product.image}
              height={275}
              width={275}
            />
            <div className={s.middle}>
              <div className={s.text}>
                <p>{product.description}</p>
              </div>
            </div>
            <p className={s.title}>{product.title}</p>
            <p className={s.price}>{product.price} Kr.</p>
          </div>
        </a>
      </Link>
      <div className={s.addtocart}>
        <div className={s.addtocartselect}>
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
        <div className={s.addtocartbutton}>
          <Button
            size="small"
            primary
            onClick={() => addLine(product.id, quantity)}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
