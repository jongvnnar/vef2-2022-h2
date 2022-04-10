import Image from 'next/image';
import { CartLine } from '../types/Cart';
import s from '../styles/CartLineDetails.module.scss';
import classNames from 'classnames';
import { formatPrice } from '../lib/price-format';

type Props = {
  line: CartLine;
};

export default function CartLineDetails({ line }: Props) {
  return (
    <div className={s.line}>
      <div className={s.title}>
        <div className={s.image}>
          <Image
            alt=""
            src={line.image}
            layout={'fill'}
            objectFit={'contain'}
          />
        </div>
        <div className={s.name}>
          <p>{line.title}</p>
        </div>
      </div>
      <div className={s.desc}>
        <p>{line.description}</p>
      </div>
      <div className={s.right}>
        <p>{formatPrice(line.price)}</p>
      </div>
      <div className={s.right}>
        <div className={s.quantity}>
          <button>&minus;</button>
          <p>{line.quantity}</p>
          <button>+</button>
        </div>
      </div>
      <div className={classNames(s.right, s.total)}>
        <p>{formatPrice(line.total)}</p>
      </div>
      <div>
        <div className={s.center}>
          <button className={s.delete}>
            <Image
              src="/close_icon.svg"
              height={30}
              width={30}
              alt="Eyða vöru"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
