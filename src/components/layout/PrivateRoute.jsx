import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PrivateRoute = ({ children }) => {

  // Check if the JWT is in localStorage
  const token = localStorage.getItem("jwt");
  if(!token){
    return <Navigate to="/login" />;
  }
  const decoded = jwtDecode(token);
  if (!(Math.floor(Date.now() / 1000) < decoded.exp)) { 
    localStorage.removeItem('jwt');
    return <Navigate to="/login" />;
  }

  // If token is valid, render the children (dashboard content)
  return children;
};

export default PrivateRoute;
