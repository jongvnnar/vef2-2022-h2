import Image from 'next/image';
import { MenuItem } from '../types/Menu';
import Button from './Button';
import Link from 'next/link';
import s from '../styles/MenuItemCard.module.scss';
import { AddToCartForm } from './AddToCartForm';

type Props = {
  product: MenuItem;
};

export default function MenuItemCard({ product }: Props) {
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
      <AddToCartForm productId={product.id} />
    </div>
  );
}
