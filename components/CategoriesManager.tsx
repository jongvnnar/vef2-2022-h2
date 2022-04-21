import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/Auth';
import { Category } from '../types/Category';
import { Input } from './Input';
import s from '../styles/CategoriesManager.module.scss';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

type Props = {
  categories: Category[];
  refresh: () => void;
};

export default function CategoriesManager({ categories, refresh }: Props) {
  const { token } = useAuth();

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

  return (
    <div>
      <h2 className={s.header}>Manage Categories</h2>
        {categories.length !== 0 ? (
          <ul className={s.categoryList}>
            {categories.map((item: Category) => (
              <li key={item.id}>
                <SingleCategoryEditor category={item} refresh={refresh} />
              </li>
            ))}
          </ul>
        ) : (
          <p>No categories</p>
        )}
        <p className={s.newLabel}>Create a new category:</p>
      <div className={s.new}>
        <div className={s.newInput}>
          <Input label="" name="" value={newTitle} setValue={setNewTitle} />
        </div>
        <button onClick={saveNewCategory} title="save category">
          <Image src="/save_icon.svg" width={35} height={35} alt="" />
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
        <div className={s.categoryTitle}>
          <Input label="" name="" value={title} setValue={setTitle} />
        </div>
        <button onClick={() => update(category.id)} title="save category">
          <Image src="/save_icon.svg" width={30} height={30} alt="" />
        </button>
        <button onClick={edit} title="discard changes">
          <Image src="/close_icon.svg" width={30} height={30} alt="" />
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className={s.categoryTitle}>
        <p>{category.title}</p>
      </div>
      <button onClick={edit} title="edit category">
        <Image src="/edit_icon.svg" width={30} height={30} alt="" />
      </button>
      <button onClick={() => deleteCategory(category.id)} title="delete category">
        <Image src="/close_icon.svg" width={30} height={30} alt="" />
      </button>
    </div>
  );
}
