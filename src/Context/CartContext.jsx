"use client";
import React, { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext(undefined);

export function CartProvider({ children }) {
  // const [items, setItems] = useState([]);

  // useEffect(() => {
  //   const saved = localStorage.getItem("cart");
  //   if (saved) {
  //     setItems(JSON.parse(saved));
  //   }
  // }, []);

  const [items, setItems] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addItem = newItem => {
    const existing = items.find(
      item =>
        item.productId === newItem.productId &&
        item.size === newItem.size &&
        item.color === newItem.color,
    );

    if (existing) {
      setItems(
        items.map(item =>
          item.id === existing.id
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item,
        ),
      );
    } else {
      setItems([...items, newItem]);
    }
  };

  const updateItemQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeItem(productId);
    } else {
      setItems(
        items.map(item =>
          item.productId === productId ? { ...item, quantity } : item,
        ),
      );
    }
  };

  const removeItem = productId => {
    setItems(items.filter(item => item.productId !== productId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateItemQuantity,
        removeItem,
        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
