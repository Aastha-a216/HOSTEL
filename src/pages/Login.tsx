import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/auth-context';
import { ArrowRight, AlertCircle } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { session, signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (session) {
      navigate('/dashboard');
    }
  }, [session, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signIn(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-off pt-20 px-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="font-grotesk font-bold text-4xl text-brand-black mb-2">Welcome Back</h1>
          <p className="font-serif italic text-brand-black/60">Sign in to your SmartMess account</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border-3 border-brand-black shadow-brutal p-8 space-y-5">
          {error && (
            <div className="flex items-start gap-3 bg-red-50 border-2 border-red-200 p-4">
              <AlertCircle size={18} className="text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700 font-mono">{error}</p>
            </div>
          )}

          <div>
            <label className="block font-mono text-xs font-bold uppercase tracking-widest text-brand-black/60 mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border-2 border-brand-black font-mono text-sm focus:outline-none focus:shadow-brutal"
              required
            />
          </div>

          <div>
            <label className="block font-mono text-xs font-bold uppercase tracking-widest text-brand-black/60 mb-2">
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 border-2 border-brand-black font-mono text-sm focus:outline-none focus:shadow-brutal"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full group bg-brand-blue border-3 border-brand-black shadow-brutal hover:shadow-none hover:translate-x-2 hover:translate-y-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all py-4 font-grotesk font-bold text-white flex items-center justify-between px-6"
          >
            <span>{loading ? 'Signing In...' : 'Sign In'}</span>
            <ArrowRight size={18} />
          </button>

          <p className="text-center font-mono text-xs text-brand-black/50 mt-4">
            Don&apos;t have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/signup')}
              className="text-brand-blue hover:underline font-bold"
            >
              Sign Up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
