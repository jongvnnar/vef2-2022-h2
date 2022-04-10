import styles from '../styles/Footer.module.scss';
import Link from 'next/link';
export default function Footer() {
  return (
    <footer>
      <div className={styles.link_container}>
        <Link href="/admin">
          <a className={styles.link}>Administration</a>
        </Link>
      </div>
    </footer>
  );
}
