import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

type cartContextType = {
  cartId: string | null;
  addCartId: (id: string) => void;
  createCartId: () => void;
  clearCartId: () => void;
};

const cartContextDefaultValues: cartContextType = {
  cartId: null,
  addCartId: (id: string) => {},
  createCartId: () => {},
  clearCartId: () => {},
};

const CartContext = createContext<cartContextType>(cartContextDefaultValues);

export function useCart() {
  return useContext(CartContext);
}

type Props = {
  children: ReactNode;
};

export function CartProvider({ children }: Props) {
  const [cartId, setCartId] = useState<string | null>(null);

  useEffect(() => {
    const item = localStorage.getItem('cart');
    if (item) {
      setCartId(item);
    }
  }, []);

  const createCartId = async () => {
    const result = await fetch(`${apiUrl}/cart`, { method: 'POST' });

    if (result.ok) {
      const json = await result.json();
      addCartId(json.id);
    }
  };

  const addCartId = (id: string) => {
    localStorage.setItem('cart', id);
    setCartId(id);
  };

  const clearCartId = () => {
    localStorage.removeItem('cart');
    setCartId(null);
  };

  const value = {
    cartId,
    addCartId,
    createCartId,
    clearCartId,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
