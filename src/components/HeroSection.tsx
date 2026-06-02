import { ArrowRight, Zap, TrendingUp, Users } from 'lucide-react';
import BottomCards from './BottomCards';
import FloatingBadge from './FloatingBadge';

const labels = [
  { text: 'REAL-TIME FEEDBACK', color: 'bg-brand-blue text-white' },
  { text: 'ANALYTICS POWERED', color: 'bg-brand-yellow text-brand-black' },
  { text: 'STUDENT-FIRST', color: 'bg-brand-pink text-white' },
];

const stats = [
  { value: '12K+', label: 'Feedbacks collected', icon: <Users size={14} /> },
  { value: '98%', label: 'Response rate', icon: <Zap size={14} /> },
  { value: '4.8x', label: 'Faster resolution', icon: <TrendingUp size={14} /> },
];

export default function HeroSection() {
  return (
    <section className="min-h-screen bg-brand-off pt-16 overflow-hidden relative">
      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(#0A0A0A 1px, transparent 1px), linear-gradient(90deg, #0A0A0A 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Announcement bar */}
        <div className="mt-8 mb-10 inline-flex items-center gap-3 bg-white border-2 border-brand-black shadow-brutal-sm px-4 py-2">
          <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-brand-black">
            Now live at 40+ institutions across India
          </span>
          <ArrowRight size={12} className="text-brand-blue" />
        </div>

        {/* Two-column hero */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-6 items-start">
          {/* LEFT */}
          <div className="flex flex-col gap-7">
            <div className="flex flex-wrap gap-2">
              {labels.map((l) => (
                <span key={l.text} className={`${l.color} font-mono text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 border-2 border-brand-black shadow-brutal-sm`}>
                  {l.text}
                </span>
              ))}
            </div>

            <div>
              <h1
                className="font-grotesk font-bold text-brand-black leading-[0.91] tracking-[-0.04em]"
                style={{ fontSize: 'clamp(3rem, 7.5vw, 6.5rem)' }}
              >
                MESS<br />FEEDBACK<br />
                <span className="text-brand-blue">IS BROKEN.</span>
              </h1>
              <div className="mt-3 flex items-center gap-3">
                <div className="h-[4px] w-16 bg-brand-pink" />
                <h2
                  className="font-grotesk font-bold text-brand-black leading-[0.91] tracking-[-0.04em]"
                  style={{ fontSize: 'clamp(3rem, 7.5vw, 6.5rem)' }}
                >
                  WE FIX IT.
                </h2>
              </div>
            </div>

            <p className="font-serif italic text-brand-black/70 text-lg lg:text-xl leading-relaxed max-w-md">
              SmartMess replaces paper forms and silent complaints with real-time student feedback, micro-ratings, and institutional analytics — so nothing slips through the cracks.
            </p>

            <div className="flex flex-wrap gap-4">
              {stats.map((s) => (
                <div key={s.label} className="bg-white border-2 border-brand-black shadow-brutal px-5 py-4 hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all duration-200 cursor-default">
                  <div className="flex items-center gap-1.5 text-brand-blue mb-1">
                    {s.icon}
                    <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-brand-black/50">{s.label}</span>
                  </div>
                  <div className="font-grotesk font-bold text-brand-black text-2xl tracking-tight">{s.value}</div>
                </div>
              ))}
            </div>

            <div className="flex items-start gap-3 border-l-4 border-brand-yellow pl-4">
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-brand-black/40 mb-1">Founder&apos;s note</p>
                <p className="font-serif italic text-brand-black/60 text-sm leading-relaxed">
                  &ldquo;I built this after eating the same bad food for a semester and watching feedback forms collect dust. No more.&rdquo;
                </p>
                <p className="font-mono text-[10px] font-bold text-brand-black mt-2 uppercase tracking-wider">
                  — Aryan K., Founder &amp; CEO
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col items-center lg:items-end gap-8 relative">
            <FloatingBadge />

            <div className="w-full max-w-sm lg:max-w-md">
              <button className="w-full group bg-brand-blue border-[3px] border-brand-black shadow-brutal hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all duration-200 px-8 py-7 flex items-center justify-between">
                <div className="text-left">
                  <div className="font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-white/60 mb-1">No credit card required</div>
                  <div className="font-grotesk font-bold text-white leading-tight tracking-tight" style={{ fontSize: 'clamp(1.2rem, 3vw, 1.7rem)' }}>
                    VIEW LIVE<br />DASHBOARD
                  </div>
                </div>
                <div className="w-12 h-12 bg-white border-2 border-brand-black flex items-center justify-center group-hover:rotate-45 transition-transform duration-200 flex-shrink-0 ml-4">
                  <ArrowRight size={20} className="text-brand-blue" />
                </div>
              </button>

              <button className="w-full mt-4 group bg-brand-yellow border-[3px] border-brand-black shadow-brutal hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all duration-200 px-8 py-5 flex items-center justify-between">
                <div className="text-left">
                  <div className="font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-brand-black/50 mb-1">Book a 15-min call</div>
                  <div className="font-grotesk font-bold text-brand-black text-xl leading-tight tracking-tight">
                    GET SMART INSIGHTS
                  </div>
                </div>
                <div className="w-10 h-10 bg-brand-black border-2 border-brand-black flex items-center justify-center group-hover:rotate-45 transition-transform duration-200 flex-shrink-0 ml-4">
                  <ArrowRight size={16} className="text-brand-yellow" />
                </div>
              </button>
            </div>

            <div className="w-full max-w-sm lg:max-w-md">
              <div className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-brand-black/40 mb-3 text-center">Trusted by student bodies at</div>
              <div className="flex flex-wrap justify-center gap-2">
                {['IIT Delhi', 'NIT Trichy', 'BITS Pilani', 'VIT Vellore', 'NIIT', 'Manipal'].map((inst) => (
                  <span key={inst} className="font-mono text-[9px] font-bold uppercase tracking-wider text-brand-black bg-white border-2 border-brand-black px-3 py-1.5 shadow-brutal-sm">
                    {inst}
                  </span>
                ))}
              </div>
            </div>

            <div className="absolute -top-4 -right-4 lg:right-0 font-grotesk font-bold text-brand-black/[0.04] select-none pointer-events-none" style={{ fontSize: 'clamp(8rem, 18vw, 14rem)', lineHeight: 1 }}>
              01
            </div>
          </div>
        </div>

        <BottomCards />
      </div>
    </section>
  );
}
