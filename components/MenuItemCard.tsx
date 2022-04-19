import Image from "next/image";
import { MenuItem } from '../types/Menu';
import s from '../styles/MenuItemCard.module.scss';


type Props = {
  product: MenuItem;
};

export default function MenuItemCard({ product }: Props) {
  return (
    <div className={s.card}>
      <p className={s.title}>{product.title}</p>
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
    </div>
  )
}
