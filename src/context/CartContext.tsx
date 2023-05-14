import { MenuItem } from '@/entitiesTypes';
import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';

type Cart = { item: MenuItem; quantity: number };

type CartContext = {
  cart: Cart[];
  addToCart: (_item: MenuItem) => void;
  removeFromCart: (_itemId: number) => void;
  decreaseQuantity: (_itemId: number) => void;
};

const CartContext = createContext<CartContext | null>(null);

export const CartContextProvider: React.FC<{ children: any }> = ({ children }) => {
  const [cart, setCartState] = useState<Cart[]>([]);

  const addToCart = useCallback(
    (menuItem: MenuItem) => {
      const data = cart.find(({ item }) => item.id === menuItem.id);

      const updatedCart = data
        ? cart.map(({ item, quantity }) => ({ item, quantity: item.id === menuItem.id ? quantity + 1 : quantity }))
        : [...cart, { item: menuItem, quantity: 1 }];
      setCartState(updatedCart);
    },
    [cart]
  );

  const removeFromCart = useCallback(
    (itemId: number) => {
      const updatedCart = cart.filter(({ item }) => item.id !== itemId);
      setCartState(updatedCart);
    },
    [cart]
  );

  const decreaseQuantity = useCallback(
    (itemId: number) => {
      const updatedCart = cart.map(({ item, quantity }) => ({
        item,
        quantity: item.id === itemId ? quantity - 1 : quantity,
      }));
      setCartState(updatedCart);
    },
    [cart]
  );

  const contextValue = useMemo(
    () => ({ cart, addToCart, removeFromCart, decreaseQuantity }),
    [cart, addToCart, removeFromCart, decreaseQuantity]
  );

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};

export function useCartContext() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useAuth must be used within a CartContextProvider');
  }

  return context;
}
