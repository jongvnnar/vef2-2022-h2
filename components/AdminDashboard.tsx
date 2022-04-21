import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/Auth';
import Button from './Button';
import CategoriesManager from './CategoriesManager';
import MenuItemForm from './MenuItemForm';
import s from '../styles/AdministrationDashboard.module.scss';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function AdminDashboard() {
  const { user, authenticated, logoutUser } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);

  async function fetchCategories() {
    setLoading(true);
    setError('');

    let json;

    try {
      const result = await fetch(`${apiUrl}/categories`);

      if (!result.ok) {
        throw new Error('Results not ok');
      }

      json = await result.json();
    } catch (e) {
      console.warn('unable to fetch categories', e);
      setError('Unable to fetch data');
      return;
    } finally {
      setLoading(false);
    }

    setCategories(json?.items || []);
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  const logout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    logoutUser();
  };

  if (!authenticated) {
    return <></>;
  }

  return (
    <div>
      <h1>Administration Dashboard</h1>
      <h2 className={s.orderLink}>
        <Link href="/admin/orders">View Orders</Link>
      </h2>
      {loading ? <p>loading...</p> :
      error ? <p>{error}</p> :
      <>
      <CategoriesManager categories={categories} refresh={fetchCategories} />
      <MenuItemForm categories={categories} />
      </>}
      <div className={s.user}>
        <h2>Account</h2>
        <p>Signed in as <strong>{user?.name}</strong></p>
        <Button type="button" size="small" onClick={logout} primary={false}>
        Log out
      </Button>
      </div>
    </div>
  );
}
