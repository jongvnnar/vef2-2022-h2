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
  numLines: number;
  addCartId: (id: string) => void;
  createCart: () => void;
  deleteCart: () => void;
  addLine: (productId: number, quantity: number) => void;
  deleteLine: (lineId: number) => void;
  editLineQuantity: (lineId: number, increase: number) => void;
};

const cartContextDefaultValues: cartContextType = {
  cartId: null,
  numLines: 0,
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
  const [numLines, setNumLines] = useState(0);

  const getNumLines = async () => {
    if (!cartId) return 0;
    const result = await fetch(`${apiUrl}/cart/${cartId}`, { method: 'GET' });

    if (result.ok) {
      const cart = await result.json();
      return cart.lines.length;
    }
    return 0;
  }

  useEffect(() => {
    async function getCart() {
      const item = localStorage.getItem('cart');
      if (item) {
        setCartId(item);
        const lines = await getNumLines();
        setNumLines(lines);
      }
    }
    getCart();
  });

  const createCart = async () => {
    const result = await fetch(`${apiUrl}/cart`, { method: 'POST' });

    if (result.ok) {
      const json = await result.json();
      addCartId(json.id);
      return json.id;
    }
    return -1;
  };

  const addCartId = async (id: string) => {
    localStorage.setItem('cart', id);
    setCartId(id);
    const lines = await getNumLines();
    setNumLines(lines);
  };

  const deleteCart = () => {
    localStorage.removeItem('cart');
    setCartId(null);
    fetch(`${apiUrl}/cart/${cartId}`, { method: 'DELETE' });
    setNumLines(0);
  };

  const addLine = async (productId: number, quantity: number) => {
    let newId;
    if (!cartId) {
      newId = await createCart();
    }

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
    setNumLines(numLines+1);
  }

  const deleteLine = async (lineId: number) => {
    await fetch(`${apiUrl}/cart/${cartId}/line/${lineId}`, { method: 'DELETE' });

    const lines = await getNumLines();
    setNumLines(lines);
    if (lines < 1) {
      deleteCart();
    }
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
    numLines,
    addCartId,
    createCart,
    deleteCart,
    addLine,
    deleteLine,
    editLineQuantity
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
