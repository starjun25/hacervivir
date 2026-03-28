import { Navigate } from 'react-router-dom';
import { isTokenExpired, clearSession } from '../utils/auth';
import toast from 'react-hot-toast';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (isTokenExpired()) {
    clearSession();
    toast.error('Tu sesión ha expirado. Por favor inicia sesión nuevamente.');
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
