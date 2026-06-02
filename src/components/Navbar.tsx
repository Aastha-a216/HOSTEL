import { Link, useNavigate } from 'react-router-dom';
import { BarChart3, Menu, X, LogOut, LayoutDashboard, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../lib/auth-context';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { session, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-off border-b-[3px] border-brand-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-brand-blue border-2 border-brand-black shadow-brutal-sm flex items-center justify-center rotate-1">
              <BarChart3 size={18} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="font-grotesk font-bold text-brand-black text-xl tracking-tight">
              Smart<span className="text-brand-blue">Mess</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {session ? (
              <>
                <Link to="/dashboard" className="font-mono text-[11px] text-brand-black uppercase tracking-widest hover:text-brand-blue transition-colors duration-150 font-bold flex items-center gap-1.5">
                  <LayoutDashboard size={14} /> Dashboard
                </Link>
                <Link to="/analytics" className="font-mono text-[11px] text-brand-black uppercase tracking-widest hover:text-brand-blue transition-colors duration-150 font-bold flex items-center gap-1.5">
                  <TrendingUp size={14} /> Analytics
                </Link>
                <button onClick={handleSignOut} className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-widest text-brand-black border-2 border-brand-black shadow-brutal-sm hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all px-4 py-2">
                  <LogOut size={14} /> Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/" className="font-mono text-[11px] text-brand-black uppercase tracking-widest hover:text-brand-blue transition-colors duration-150 font-bold">Home</Link>
                <Link to="/login" className="font-mono text-[11px] uppercase tracking-widest text-brand-black hover:text-brand-blue transition-colors font-bold">Sign in</Link>
                <Link to="/signup" className="font-mono text-[11px] font-bold uppercase tracking-widest bg-brand-black text-brand-off px-4 py-2 border-2 border-brand-black shadow-brutal-sm hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-150">Get Demo</Link>
              </>
            )}
          </div>

          <button onClick={() => setOpen(!open)} className="md:hidden w-10 h-10 border-2 border-brand-black flex items-center justify-center shadow-brutal-sm hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t-2 border-brand-black bg-brand-off px-6 py-4 flex flex-col gap-4">
          {session ? (
            <>
              <Link to="/dashboard" className="font-mono text-[11px] font-bold uppercase tracking-widest text-brand-black flex items-center gap-2"><LayoutDashboard size={14} /> Dashboard</Link>
              <Link to="/analytics" className="font-mono text-[11px] font-bold uppercase tracking-widest text-brand-black flex items-center gap-2"><TrendingUp size={14} /> Analytics</Link>
              <button onClick={handleSignOut} className="font-mono text-[11px] font-bold uppercase tracking-widest text-brand-black flex items-center gap-2"><LogOut size={14} /> Sign Out</button>
            </>
          ) : (
            <>
              <Link to="/" className="font-mono text-[11px] font-bold uppercase tracking-widest text-brand-black">Home</Link>
              <Link to="/login" className="font-mono text-[11px] font-bold uppercase tracking-widest text-brand-black">Sign in</Link>
              <Link to="/signup" className="font-mono text-[11px] font-bold uppercase tracking-widest bg-brand-black text-brand-off px-4 py-3 border-2 border-brand-black shadow-brutal">Get Demo</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
