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
  createCart: () => void;
  deleteCart: () => void;
  addLine: (productId: number, quantity: number) => void;
  deleteLine: (lineId: number) => void;
  editLineQuantity: (lineId: number, increase: number) => void;
};

const cartContextDefaultValues: cartContextType = {
  cartId: null,
  addCartId: (id: string) => {},
  createCart: () => {return 0},
  deleteCart: () => {},
  addLine: () => {},
  deleteLine: () => {},
  editLineQuantity: () => {},
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

  const createCart = async () => {
    const result = await fetch(`${apiUrl}/cart`, { method: 'POST' });

    if (result.ok) {
      const json = await result.json();
      addCartId(json.id);
      return json.id;
    }
    return -1;
  };

  const addCartId = (id: string) => {
    localStorage.setItem('cart', id);
    setCartId(id);
  };

  const deleteCart = () => {
    localStorage.removeItem('cart');
    setCartId(null);
    fetch(`${apiUrl}/cart/${cartId}`, { method: 'DELETE' });
  };

  const addLine = async (productId: number, quantity: number) => {
    let newId;
    if (!cartId) {
      newId = await createCart();
    }

    console.log('cartId :>> ', cartId);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        product: productId,
        quantity
      })
    };
    fetch(`${apiUrl}/cart/${cartId ?? newId}`, options);
  }

  const deleteLine = async (lineId: number) => {
    await fetch(`${apiUrl}/cart/${cartId}/line/${lineId}`, { method: 'DELETE' });

    const numLines = await getNumLines();
    if (numLines < 1) {
      deleteCart();
    }
  }

  const getNumLines = async () => {
    const result = await fetch(`${apiUrl}/cart/${cartId}`, { method: 'GET' });

    if (result.ok) {
      const cart = await result.json();
      return cart.lines.length;
    }
    return 0;
  }

  const editLineQuantity = async (lineId: number, increase: number) => {
    const getLine = await fetch(`${apiUrl}/cart/${cartId}/line/${lineId}`, { method: 'GET' });

    if (getLine.ok) {
      const line = await getLine.json();

      const newQuantity = line.quantity + increase;

      if (newQuantity < 1) {
        deleteLine(lineId);
      } else {
        const options = {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            quantity: newQuantity
          })
        };
        fetch(`${apiUrl}/cart/${cartId}/line/${lineId}`, options);
      }
    }
  }

  const value = {
    cartId,
    addCartId,
    createCart,
    deleteCart,
    addLine,
    deleteLine,
    editLineQuantity
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
