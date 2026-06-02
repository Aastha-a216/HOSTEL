import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-brand-off">
      <HeroSection />

      {/* CTA Section */}
      <section className="bg-brand-black text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-grotesk font-bold text-4xl mb-6">Ready to transform feedback?</h2>
          <p className="font-serif italic text-lg text-white/70 mb-8 max-w-2xl mx-auto">
            Join hundreds of institutional cafeterias and hostels already using SmartMess to collect real-time student feedback and drive data-driven decisions.
          </p>
          <button
            onClick={() => navigate('/signup')}
            className="font-grotesk font-bold text-lg bg-brand-blue border-3 border-white shadow-[0_0_0_3px_#0A0A0A] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all px-8 py-4 text-white"
          >
            Get Started Free
          </button>
        </div>
      </section>
    </div>
  );
}
