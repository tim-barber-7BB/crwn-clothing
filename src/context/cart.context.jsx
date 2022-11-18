import { createContext, useEffect, useState } from 'react';

const addCartItem = (cartItems, productToAdd) => {

  const existingCartItem = cartItems.find((cartItem) => {
    return cartItem.id === productToAdd.id});

  if(existingCartItem) {
    return cartItems.map((cartItem) => 
      cartItem.id === productToAdd.id
        ? {...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, {...productToAdd, quantity: 1}]
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find((cartItem) => {
    return cartItem.id === cartItemToRemove.id});

  if(existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map((cartItem) => 
      cartItem.id === cartItemToRemove.id
        ? {...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
};

const clearCartItem = (cartItems, cartItemToClear) => cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartTotal: 0,
});

export const CartProvider = ({children}) =>{
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setTotal] = useState(0);

  useEffect(() => {
    const newCardcount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
    setCartCount(newCardcount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce((total, cartItem) => total + (cartItem.quantity * cartItem.price), 0)
    setTotal(newCartTotal);
  }, [cartItems]);


  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove))
  };

  const clearItemFromCart = (cartItemToClear) => setCartItems(clearCartItem(cartItems, cartItemToClear))

  const value = {isCartOpen, setIsCartOpen, cartItems, addItemToCart, removeItemFromCart, cartCount, clearItemFromCart, cartTotal};
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
};