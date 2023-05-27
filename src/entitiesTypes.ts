import { OrderStatus, Token } from '@prisma/client';

export type Dish = {
  id: number;
  title: string;
  description: string;
  kcal?: number;
  image?: string;
};

export type MenuItem = {
  id: number;
  price: number;
  dish: Dish;
  category?: Category;
};

export type Category = {
  id: number;
  title: string;
  description: string;
  items: MenuItem[];
};

export type Order = {
  id: string;
  orderDetails: OrderDetails[];
  status: OrderStatus;
  token: Token;
};

export type OrderDetails = {
  id: string;
  orderId: string;
  menuItem: MenuItem;
  quantity: number;
};
