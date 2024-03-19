import React, { createContext, useState, useContext } from 'react';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  console.log("context", user);


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Giải mã token và lấy thông tin người dùng
      const decodedToken = jwtDecode(token);
      setUser(decodedToken);
    }

  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};