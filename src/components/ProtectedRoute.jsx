import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function ProtectedRoute({ children }) {
  const { user, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="grid min-h-[60vh] place-items-center bg-gray-50 px-4">
        <div className="rounded-2xl bg-white px-6 py-5 text-sm font-bold text-emerald-900 shadow-sm">
          Checking admin access...
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/admin-login" replace state={{ from: location }} />;
  }

  return children;
}
