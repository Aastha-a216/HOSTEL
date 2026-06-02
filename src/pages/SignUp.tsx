import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/auth-context';
import { supabase, Institution } from '../lib/supabase';
import { ArrowRight, AlertCircle } from 'lucide-react';

export default function SignUp() {
  const navigate = useNavigate();
  const { session } = useAuth();
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    institutionId: '',
  });

  useEffect(() => {
    if (session) {
      navigate('/dashboard');
    }
  }, [session, navigate]);

  useEffect(() => {
    const fetchInstitutions = async () => {
      const { data, error } = await supabase.from('institutions').select('*');
      if (error) {
        setError('Failed to load institutions');
      } else {
        setInstitutions(data || []);
      }
    };
    fetchInstitutions();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('No user created');

      const { error: studentError } = await supabase.from('students').insert({
        user_id: authData.user.id,
        institution_id: formData.institutionId,
        full_name: formData.fullName,
        email: formData.email,
      });

      if (studentError) throw studentError;

      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to sign up');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-off pt-20 px-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="font-grotesk font-bold text-4xl text-brand-black mb-2">Join SmartMess</h1>
          <p className="font-serif italic text-brand-black/60">Get real-time feedback from your community</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border-[3px] border-brand-black shadow-brutal p-8 space-y-5">
          {error && (
            <div className="flex items-start gap-3 bg-red-50 border-2 border-red-200 p-4">
              <AlertCircle size={18} className="text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700 font-mono">{error}</p>
            </div>
          )}

          <div>
            <label className="block font-mono text-xs font-bold uppercase tracking-widest text-brand-black/60 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-4 py-3 border-2 border-brand-black font-mono text-sm focus:outline-none focus:shadow-brutal"
              required
            />
          </div>

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

          <div>
            <label className="block font-mono text-xs font-bold uppercase tracking-widest text-brand-black/60 mb-2">
              Institution
            </label>
            <select
              value={formData.institutionId}
              onChange={(e) => setFormData({ ...formData, institutionId: e.target.value })}
              className="w-full px-4 py-3 border-2 border-brand-black font-mono text-sm focus:outline-none focus:shadow-brutal"
              required
            >
              <option value="">Select your institution</option>
              {institutions.map((inst) => (
                <option key={inst.id} value={inst.id}>
                  {inst.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full group bg-brand-blue border-[3px] border-brand-black shadow-brutal hover:shadow-none hover:translate-x-2 hover:translate-y-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all py-4 font-grotesk font-bold text-white flex items-center justify-between px-6"
          >
            <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
            <ArrowRight size={18} />
          </button>

          <p className="text-center font-mono text-xs text-brand-black/50 mt-4">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-brand-blue hover:underline font-bold"
            >
              Sign In
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
