// ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import AuthService from '../utils/auth.js';

function ProtectedRoute({ element, ...rest }) {
  const authService = new AuthService();
  const isAuthenticated = authService.loggedIn();
  return isAuthenticated ? element : <Navigate to="/login" />;
}

export default ProtectedRoute;
