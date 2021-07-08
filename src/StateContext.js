import React, { createContext, useEffect, useState } from 'react';

export const StateContext = createContext();

export const StateProvider = (props) => {

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    getCart();
  }, [])

  
  const updateCart = (updatedCart = []) => {
    if (storageIsAvailable('sessionStorage')) {
      if (updatedCart.length === 0) {
        sessionStorage.removeItem('cart');  
      }
      else {
        sessionStorage.setItem('cart', JSON.stringify(updatedCart));
      } 
    }
    setCartItems(updatedCart);
  }

  const getCart = () => {
    if (storageIsAvailable('sessionStorage')) {
      if (sessionStorage.getItem('cart')) {
        setCartItems(JSON.parse(sessionStorage.getItem('cart')));
      }
    }
  }

  const storageIsAvailable = (type) => {
    let storage;
    try {
        storage = window[type];
        var x = 'test';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return false;
    }
}



  return (
    <StateContext.Provider value={[cartItems, updateCart]}>
      {props.children}
    </StateContext.Provider>
  );
};