import { MenuItem } from '@/entitiesTypes';
import React, { createContext, useContext, useState, useMemo, useCallback, useEffect } from 'react';

type Cart = { item: MenuItem; quantity: number };

type CartContext = {
  cart: Cart[];
  addedToCartLength: number;
  totalPrice: number;
  addToCart: (_item: MenuItem) => void;
  removeFromCart: (_itemId: number) => void;
  decreaseQuantity: (_itemId: number) => void;
  clearAll: () => void;
};

const CartContext = createContext<CartContext | null>(null);

export const CartContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCartState] = useState<Cart[]>([]);
  const [addedToCartLength, setAddedToCartLength] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

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

  const clearAll = useCallback(() => {
    setCartState([]);
  }, []);

  const getTotal = useCallback(() => {
    return {
      totalItems: cart.reduce((total, { quantity }) => total + quantity, 0),
      totalPrice: cart.reduce((total, { quantity, item }) => {
        return total + item.price * quantity;
      }, 0),
    };
  }, [cart]);

  useEffect(() => {
    setAddedToCartLength(getTotal().totalItems);
    setTotalPrice(getTotal().totalPrice);
  }, [getTotal]);

  const contextValue = useMemo(
    () => ({ cart, addToCart, removeFromCart, decreaseQuantity, clearAll, addedToCartLength, totalPrice }),
    [cart, addToCart, removeFromCart, decreaseQuantity, clearAll, addedToCartLength, totalPrice]
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
