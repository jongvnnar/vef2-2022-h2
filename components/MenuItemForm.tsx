import { EventHandler, useEffect, useState } from 'react';
import { useAuth } from '../context/Auth';
import { Category } from '../types/Category';
import { Error } from '../types/Error';
import Button from './Button';
import { Input } from './Input';
import s from '../styles/MenuItemForm.module.scss';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

type Props = {
  categories: Category[];
};

export default function MenuItemForm({ categories }: Props) {
  const { token, logoutUser } = useAuth();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState(1);
  const [image, setImage] = useState<File | null>(null);

  const [error, setError] = useState('');
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const [imageError, setImageError] = useState('');

  const [saving, setSaving] = useState(false);

  const saveMenuItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setTitleError('');
    setDescriptionError('');
    setPriceError('');
    setCategoryError('');
    setImageError('');

    let json;

    try {
      const formdata = new FormData();
      formdata.append('title', title);
      formdata.append('price', price);
      formdata.append('description', description);
      if (image) {
        formdata.append('image', image);
      }
      formdata.append('category', category.toString());

      const options = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formdata,
      };

      const result = await fetch(`${apiUrl}/menu`, options);

      json = await result.json();

      if (result.status === 401) {
        logoutUser();
      }
      else if (!result.ok) {
        console.error('json.errors :>> ', json.errors);
        json?.errors?.forEach((error: Error) => {
          if (error.param === 'title') {
            setTitleError(error.msg);
          } else if (error.param === 'description') {
            setDescriptionError(error.msg);
          } else if (error.param === 'price') {
            setPriceError(error.msg);
          } else if (error.param === 'category') {
            setCategoryError(error.msg);
          } else if (error.param === 'image') {
            setImageError(error.msg);
          }
        });

        throw new Error('Results not ok');
      } else {
        setError('Item saved');
        setTitle('');
        setDescription('');
        setPrice('');
        setCategory(1);
        setImage(null);
      }
    } catch (e) {
      console.warn('unable to create menu item', e);
      setError('Unable to create menu item');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h2>Create a new menu item</h2>
      <form onSubmit={saveMenuItem} className={s.menuItemForm}>
        <Input
          label="Title:"
          name="title"
          value={title}
          setValue={setTitle}
          isError={!!titleError}
          error={titleError}
        />
        <Input
          label="Description:"
          name="description"
          value={description}
          setValue={setDescription}
          isError={!!descriptionError}
          error={descriptionError}
          textarea={true}
        />
        <Input
          label="Price:"
          name="price"
          type="number"
          value={price}
          setValue={setPrice}
          isError={!!priceError}
          error={priceError}
        />
        <div className={s.category}>
          <label htmlFor="category-select">Category:</label>
          <select
            id="category-select"
            value={category}
            onChange={
              (e: /*React.FormEvent<HTMLSelectElement>*/ any) =>
                setCategory(e.target.value) /*TODO: skoða type*/
            }
          >
            {categories.map((item: Category) => (
              <option key={item.id} value={item.id}>
                {item.title}
              </option>
            ))}
          </select>
          {categoryError && <p className={s.errors}>{categoryError}</p>}
        </div>
        <div className={s.image}>
          <label htmlFor="image-input">Image:</label>
          <input
            id="image-input"
            type="file"
            name="myImage"
            onChange={(event: React.FormEvent<HTMLInputElement>) => {
              const target = event.target as HTMLInputElement;
              setImage((target.files as FileList)[0]);
            }}
          />
          {imageError && <p className={s.errors}>{imageError}</p>}
          {error && <strong className={s.message}>{error}</strong>}
          {saving && (
            <strong className={s.saving}>uploading menu item...</strong>
          )}
        </div>
        <Button type="submit" primary={true} size="large" disabled={saving}>
          Save menu item
        </Button>
      </form>
    </div>
  );
}
