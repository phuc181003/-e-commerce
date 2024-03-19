import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const RequireAuth = (WrappedComponent) => {

  const Wrapper = (props) => {
    const navigate = useNavigate();
    useEffect(() => {
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      if (decodedToken.role !== "staff") {
          
      } else {
        navigate('/*');
      }
    }, [navigate]);

    // Trả về component đã được bọc
    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};
export default RequireAuth;
