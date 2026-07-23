import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../firebase.js';

export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const redirectTo = location.state?.from?.pathname || '/admin-dashboard';

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      navigate(redirectTo, { replace: true });
    } catch {
      setError('Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-gray-100 px-4">
      <form onSubmit={handleLogin} className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-center text-3xl font-black text-emerald-900">Admin Login</h1>
        <p className="mt-2 text-center text-sm text-gray-500">Use your Firebase admin email account.</p>

        <label className="mt-8 block">
          <span className="text-sm font-bold text-gray-700">Email</span>
          <input
            type="email"
            autoComplete="email"
            required
            className="mt-2 w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-emerald-700"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>

        <label className="mt-5 block">
          <span className="text-sm font-bold text-gray-700">Password</span>
          <input
            type="password"
            autoComplete="current-password"
            required
            className="mt-2 w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-emerald-700"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>

        {error ? <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p> : null}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-emerald-800 p-3 font-bold text-white transition hover:bg-emerald-900 disabled:opacity-60"
        >
          {loading ? 'Signing in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
