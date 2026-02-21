"use client";
import { CartProvider } from "@/Context/CartContext";
import React from "react";

const Provider = ({ children }) => {
  return <CartProvider>{children}</CartProvider>;
};

export default Provider;
