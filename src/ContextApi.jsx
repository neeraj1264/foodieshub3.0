import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showButtons, setShowButtons] = useState(false);

//   useEffect(() => {
//     const storedCartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
//     setCartItems(storedCartItems);
//     setCartItemsCount(storedCartItems.length); // Update cart items count
//   }, []);

// useEffect(()=>{
//   const storedCartItemsCount = localStorage.getItem("cartItemsCount");
//   if (storedCartItemsCount) {
//     setCartItemsCount(parseInt(storedCartItemsCount, 10));
//   }
// },[])


const updateLocalStorage = (updatedCartItems) => {
  if (updatedCartItems) {
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    localStorage.setItem("cartItemsCount", updatedCartItems.length);
  }
};

  const incrementCart = () => {
      setCartItemsCount((prevCount) => prevCount + 1);
      updateLocalStorage();
  };

  const decrementCart = () => {
    if (cartItemsCount > 0) {
      setCartItemsCount((prevCount) => prevCount - 1);
      updateLocalStorage();
    }
  };

  const AddToCart = (product) => {
    setCartItems((prevItems) => {
      const updatedCartItems = [...prevItems, product];
      updateLocalStorage(updatedCartItems);
      return updatedCartItems;
    });
  };


  const updateCartItemQuantity = (productId, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
updateLocalStorage();
  };
  
  const removeCartItem = (productId) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== productId));
    updateLocalStorage();
  };

  const value = {
    updateCartItemQuantity,
    cartItemsCount,
    incrementCart,
    decrementCart,
    cartItems,
    setCartItems,
    AddToCart,
    selectedAddress,
    setSelectedAddress,
    showButtons,
    setShowButtons,
    removeCartItem
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
