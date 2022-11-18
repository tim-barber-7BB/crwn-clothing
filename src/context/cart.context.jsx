import { createContext, useEffect, useState } from 'react';

const addCartItem = (cartItems, productToAdd) => {
  console.log('cart items', cartItems);
  console.log('product to add', productToAdd);
  const existingCartItem = cartItems.find((cartItem) => {
    console.log(cartItem);
    console.log(cartItem.id, productToAdd.id);
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

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
});



export const CartProvider = ({children}) =>{
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const newCardcount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
    setCartCount(newCardcount);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const value = {isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount};
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
};