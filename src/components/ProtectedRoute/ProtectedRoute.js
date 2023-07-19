import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, isLoggedIn, setActiveModal }) {
  if (!isLoggedIn) {
    setActiveModal('login');
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
