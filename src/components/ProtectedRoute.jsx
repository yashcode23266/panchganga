import { Navigate, useLocation } from 'react-router-dom';
import { isAdminSessionActive } from '../utils/adminSession.js';

export default function ProtectedRoute({ children }) {
  const location = useLocation();

  if (!isAdminSessionActive()) {
    return <Navigate to="/admin-login" replace state={{ from: location }} />;
  }

  return children;
}
