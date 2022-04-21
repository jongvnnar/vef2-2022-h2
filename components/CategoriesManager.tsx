import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/Auth';
import { Category } from '../types/Category';
import { Input } from './Input';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

type Props = {
  categories: Category[];
  refresh: () => void;
};

export default function CategoriesManager({ categories, refresh }: Props) {
  const { token } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [newTitle, setNewTitle] = useState('');

  const saveNewCategory = async () => {
    try {
      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: newTitle,
        }),
      };
      const result = await fetch(`${apiUrl}/categories`, options);

      if (!result.ok) {
        console.error('Category not created');
      } else {
        setNewTitle('');
        refresh();
      }
    } catch (e) {
      console.warn('unable to create category', e);
      return;
    }
  };

  if (loading) {
    return <p>loading...</p>;
  }

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.length !== 0 ? (
          <ul>
            {categories.map((item: Category) => (
              <li key={item.id}>
                <SingleCategoryEditor category={item} refresh={refresh} />
              </li>
            ))}
          </ul>
        ) : (
          <p>No categories</p>
        )}
      </ul>
      <div>
        <p>Create a new category:</p>
        <Input label="" name="" value={newTitle} setValue={setNewTitle} />
        <button onClick={saveNewCategory}>
          <Image src="/save_icon.svg" width={20} height={20} alt="" />
        </button>
      </div>
    </div>
  );
}

function SingleCategoryEditor({
  category,
  refresh,
}: {
  category: Category;
  refresh: () => void;
}) {
  const { token } = useAuth();

  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(category.title);

  const edit = () => {
    setEditMode(!editMode);
  };

  const update = async (id: number) => {
    try {
      const options = {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
        }),
      };
      const result = await fetch(`${apiUrl}/categories/${id}`, options);

      if (!result.ok) {
        console.error('Category not created');
      } else {
        setTitle('');
        edit();
        refresh();
      }
    } catch (e) {
      console.warn('unable to create category', e);
      return;
    }
  };

  const deleteCategory = async (id: number) => {
    try {
      const options = {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const result = await fetch(`${apiUrl}/categories/${id}`, options);

      if (!result.ok) {
        console.error('Category not deleted');
      } else {
        refresh();
      }
    } catch (e) {
      console.warn('unable to delete category', e);
      return;
    }
  };

  if (editMode) {
    return (
      <div>
        <Input label="" name="" value={title} setValue={setTitle} />
        <button onClick={() => update(category.id)}>
          <Image src="/save_icon.svg" width={20} height={20} alt="" />
        </button>
        <button onClick={edit}>
          <Image src="/close_icon.svg" width={20} height={20} alt="" />
        </button>
      </div>
    );
  }

  return (
    <div>
      <p>{category.title}</p>
      <button onClick={edit}>
        <Image src="/edit_icon.svg" width={20} height={20} alt="" />
      </button>
      <button onClick={() => deleteCategory(category.id)}>
        <Image src="/close_icon.svg" width={20} height={20} alt="" />
      </button>
    </div>
  );
}
