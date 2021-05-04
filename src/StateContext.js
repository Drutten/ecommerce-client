import React, { createContext, useState } from 'react';
import AuthService from './services/authService';

export const StateContext = createContext();

export const StateProvider = (props) => {

  const [user, setUser] = useState(null);

  return (
    <StateContext.Provider value={[user, setUser]}>
      {props.children}
    </StateContext.Provider>
  );
};