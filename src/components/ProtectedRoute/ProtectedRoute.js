import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, isLoggedIn, setActiveModal }) {
  React.useEffect(() => {
    if (!isLoggedIn) {
      setActiveModal('login');
    }
  }, [isLoggedIn, setActiveModal]);
  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
