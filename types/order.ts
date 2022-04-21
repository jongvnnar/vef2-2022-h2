import { StateEnum } from './state';

export type Order = {
  id: string;
  name: string;
  created: string;
  current_state: StateEnum;
  current_state_created: string;
  lines: OrderLine[];
  status: StateLine[];
};

export type OrderLine = {
  productId: number;
  title: string;
  description: string;
  image: string;
  category: number;
  quantity: number;
  price: number;
  total: number;
};

export type StateLine = {
  state: StateEnum;
  created: string;
};
