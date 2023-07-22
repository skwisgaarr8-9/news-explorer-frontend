import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({
  children,
  isLoggedIn,
  setActiveModal,
  isCheckingToken,
}) {
  React.useEffect(() => {
    if (!isCheckingToken && !isLoggedIn) {
      setActiveModal('login');
    }
  }, [isLoggedIn, setActiveModal, isCheckingToken]);

  if (!isLoggedIn && !isCheckingToken) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
