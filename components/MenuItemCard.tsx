import Image from "next/image";
import { MenuItem } from '../types/Menu';
import s from '../styles/MenuItemCard.module.scss';


type Props = {
  product: MenuItem;
};

export default function MenuItemCard({ product }: Props) {
  return (
    <div className={s.container}>
      <p>{product.title}</p>
      <Image
        className={s.image}
        alt={`Image of ${product.title}`}
        src={product.image}
        height={500}
        width={500}
      />
      <div className={s.middle}>
        <div className={s.text}>
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  )
}
