/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ element }) => {
  const { user } = UserAuth();

  return user ? element : <Navigate to="/login" replace />;
};
