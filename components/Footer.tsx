import styles from '../styles/Footer.module.scss';
import Link from 'next/link';
import { useAuth } from '../context/Auth';
import Button from './Button';
import s from '../styles/AdministrationDashboard.module.scss';

export default function Footer() {
  const { authenticated, logoutUser, user } = useAuth();
  const logout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    logoutUser();
  };
  return (
    <footer>
      <div className={styles.link_container}>
        <Link href="/admin">
          <a className={styles.link}>Administration</a>
        </Link>
      </div>
      {authenticated && (
        <div className={styles.user}>
          <p>
            Signed in as <strong>{user?.name}</strong>
          </p>
          <Button type="button" size="small" onClick={logout} primary={false}>
            Sign out
          </Button>
        </div>
      )}
    </footer>
  );
}
