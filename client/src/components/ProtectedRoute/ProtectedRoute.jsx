// ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import authService from '../../utils/auth.js';

function ProtectedRoute({ element, ...rest }) {
  const isAuthenticated = authService.loggedIn();
  return isAuthenticated ? element : <Navigate to="/login" />;
}

export default ProtectedRoute;
