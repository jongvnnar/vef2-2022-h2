import { EventHandler, useEffect, useState } from "react";
import { useAuth } from "../context/Auth";
import { Category } from "../types/Category";
import { Error } from "../types/Error";
import Button from "./Button";
import { Input } from "./Input";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function MenuItemForm() {
  const { token } = useAuth();

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

  const [categories, setCategories] = useState([]);

  async function fetchData() {
    let json;

    try {
      const result = await fetch(`${apiUrl}/categories`);

      if (!result.ok) {
        throw new Error('Results not ok');
      }

      json = await result.json();
    } catch (e) {
      console.warn('unable to fetch categories', e);
      return;
    } finally {
    }

    setCategories(json?.items || []);
  }

  useEffect(() => {
    fetchData();
  }, [error]);

  const saveMenuItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setTitleError('');
    setDescriptionError('');
    setPriceError('');
    setCategoryError('');
    setImageError('');

    let json;

    try {
      const formdata = new FormData();
      formdata.append("title", title);
      formdata.append("price", price);
      formdata.append("description", description);
      formdata.append("image", image);
      formdata.append("category", category.toString());

      const options = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formdata,
      };

      const result = await fetch(`${apiUrl}/menu`, options);

      json = await result.json();

      if (!result.ok) {
        console.error('json.errors :>> ', json.errors);
        json?.errors?.forEach((error: Error) => {
          if (error.param === "title") {
            setTitleError(error.msg);
          } else if (error.param === "description") {
            setDescriptionError(error.msg);
          } else if (error.param === "price") {
            setPriceError(error.msg);
          } else if (error.param === "category") {
            setCategoryError(error.msg);
          } else if (error.param === "image") {
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
      return;
    } finally {
    }

    setCategories(json?.items || []);
  }

  return (
    <div>
      <h2>Create a new menu item</h2>
      <form onSubmit={saveMenuItem}>
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
        <label htmlFor="category-select">Category:</label>
        <select id="category-select" value={category} onChange={(e: React.FormEvent<HTMLSelectElement>) => setCategory(e.target.value)/*TODO: skoða type*/}>
          {categories.map((item: Category) => (
            <option key={item.id} value={item.id}>{item.title}</option>
          ))}
        </select>
        {categoryError && <p>{categoryError}</p>}
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
        {imageError && <p>{imageError}</p>}
        {error && <p>{error}</p>}
        <Button type="submit" primary={true} size="large">
          Save
        </Button>
      </form>
    </div>
  )
}
