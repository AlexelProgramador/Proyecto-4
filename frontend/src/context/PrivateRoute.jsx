import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ element, roles }) => {
  const { user } = useContext(AuthContext);

  if (roles && roles.length > 0 && !roles.some(role => user.roles.includes(role))) {
    // Si el usuario no tiene los roles requeridos, redirige a una página de acceso denegado o a la página principal.
    return <Navigate to="/" />;
  }

  return <Route element={element} />;
};

export default PrivateRoute;
