import Link from 'next/link';
import { useEffect, useState } from 'react';
import { OrderLine } from '../types/order';
import styles from '../styles/OrderDetails.module.scss';
import { formatPrice } from '../lib/price-format';

type Props = {
  lines: OrderLine[];
};
export function OrderDetails({ lines }: Props) {
  const [sum, setSum] = useState<number>(
    lines.reduce((agg, line) => agg + line.total, 0)
  );

  useEffect(() => {
    setSum(lines.reduce((agg, line) => agg + line.total, 0));
  }, [lines]);

  return (
    <div className={styles.table_container}>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th className={styles.number_cell}>Price</th>
            <th className={styles.number_cell}>Quantity</th>
            <th className={styles.number_cell}>Total</th>
          </tr>
        </thead>
        <tbody>
          {lines.map((value) => {
            return (
              <tr key={value.productId}>
                <td>
                  <Link href={`/menu/${value.productId}`}>
                    <a className={styles.link}>{value.title}</a>
                  </Link>
                </td>
                <td className={styles.number_cell}>
                  {formatPrice(value.price)}
                </td>
                <td className={styles.number_cell}>{value.quantity}</td>
                <td className={styles.number_cell}>
                  {formatPrice(value.total)}
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={3}>Total price</th>
            <td className={styles.number_cell}>{formatPrice(sum)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
