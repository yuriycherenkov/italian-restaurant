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
  category: Category;
};

export type Category = {
  id: number;
  title: string;
  description: string;
};
