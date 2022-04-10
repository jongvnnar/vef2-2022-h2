export type Cart = {
  id: string;
  created: string;
  lines: CartLine[];
};

export type CartLine = {
  id: number;
  product_id: number;
  title: string;
  description: string;
  image: string;
  category: number;
  quantity: number;
  price: number;
  total: number;
};
