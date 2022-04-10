import Link from 'next/link';
import { OrderLine } from '../types/order';

type Props = {
  product: OrderLine;
};
export function ProductLine({ product }: Props) {
  return (
    <li>
      <div>
        <Link href={`/products/${product.productId}`}>
          <a>{product.title}</a>
        </Link>
        <p>{product.price}</p>
        <p>{product.quantity}</p>
        <p>{product.total}</p>
      </div>
    </li>
  );
}
