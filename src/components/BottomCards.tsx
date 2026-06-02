import { Star, Droplets, Users, TrendingUp, Activity, BarChart2, ArrowUpRight } from 'lucide-react';

function MiniLineChart() {
  const pts = [20, 35, 25, 50, 45, 65, 58, 78, 72, 90];
  const w = 160;
  const h = 48;
  const xs = pts.map((_, i) => (i / (pts.length - 1)) * w);
  const ys = pts.map((v) => h - (v / 100) * h);
  const d = xs.map((x, i) => `${i === 0 ? 'M' : 'L'} ${x} ${ys[i]}`).join(' ');
  const fill = `${d} L ${w} ${h} L 0 ${h} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height: 48 }}>
      <path d={fill} fill="#0057FF" fillOpacity="0.12" />
      <path d={d} fill="none" stroke="#0057FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {xs.map((x, i) => (
        <circle key={i} cx={x} cy={ys[i]} r={i === pts.length - 1 ? 4 : 2} fill="#0057FF" opacity={i === pts.length - 1 ? 1 : 0.4} />
      ))}
    </svg>
  );
}

export default function BottomCards() {
  return (
    <div className="mt-20 relative">
      <div className="flex items-center gap-4 mb-6">
        <div className="h-[3px] w-8 bg-brand-black" />
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-brand-black/50">
          Platform snapshot — live data
        </span>
        <div className="h-[3px] flex-1 bg-brand-black/10" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 relative">
        {/* CARD 1 — Pink — Food Ratings */}
        <div className="group bg-brand-pink border-[3px] border-brand-black shadow-brutal rounded-t-2xl hover:shadow-brutal-lg hover:-translate-y-2 transition-all duration-200 p-6 relative z-10">
          <div className="flex items-start justify-between mb-5">
            <div>
              <div className="font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-white/60 mb-1">Card 01</div>
              <div className="font-grotesk font-bold text-white text-xl tracking-tight leading-tight">
                Food Ratings<br />& Sentiment
              </div>
            </div>
            <div className="w-9 h-9 bg-white/20 border-2 border-white/40 flex items-center justify-center">
              <Star size={16} className="text-white" fill="white" />
            </div>
          </div>

          <div className="bg-white/20 border-2 border-white/30 p-3 mb-4">
            <div className="font-mono text-[9px] font-bold uppercase tracking-widest text-white/60 mb-1">Today&apos;s Meal Score</div>
            <div className="flex items-baseline gap-2">
              <span className="font-grotesk font-bold text-white text-4xl tracking-tight">4.2</span>
              <span className="font-mono text-xs text-white/60">/ 5.0</span>
              <span className="font-mono text-[9px] font-bold text-white bg-white/20 px-2 py-0.5 ml-auto flex items-center gap-1">
                <ArrowUpRight size={10} /> +0.3
              </span>
            </div>
          </div>

          <div className="mb-4">
            <div className="font-mono text-[9px] font-bold uppercase tracking-widest text-white/60 mb-2">Feedback distribution</div>
            <div className="flex gap-1">
              {[
                { e: '\u{1F60D}', w: '30%' },
                { e: '\u{1F60A}', w: '40%' },
                { e: '\u{1F610}', w: '15%' },
                { e: '\u{1F615}', w: '10%' },
                { e: '\u{1F624}', w: '5%' },
              ].map((item) => (
                <div key={item.e} className="flex flex-col items-center gap-1" style={{ width: item.w }}>
                  <div className="text-base leading-none">{item.e}</div>
                  <div className="w-full bg-white/30 rounded-full" style={{ height: 3 }}>
                    <div className="h-full bg-white rounded-full" style={{ width: '100%' }} />
                  </div>
                  <div className="font-mono text-[8px] text-white/60">{item.w}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="font-mono text-[9px] font-bold uppercase tracking-widest text-white/60 mb-2">7-day trend</div>
            <div className="flex items-end gap-1 h-8">
              {[60, 75, 65, 80, 70, 85, 92].map((h, i) => (
                <div key={i} className="flex-1 bg-white rounded-sm" style={{ height: `${h}%`, opacity: 0.3 + (i / 6) * 0.7 }} />
              ))}
            </div>
          </div>

          <div className="mt-4 inline-block font-mono text-[9px] font-bold uppercase tracking-widest bg-white text-brand-pink px-3 py-1.5 border-2 border-brand-black">
            84% satisfied today
          </div>
        </div>

        {/* CARD 2 — Blue — Facility Analytics */}
        <div className="group bg-brand-blue border-[3px] border-brand-black shadow-brutal rounded-t-2xl hover:shadow-brutal-lg hover:-translate-y-2 transition-all duration-200 p-6 relative z-20 md:-mt-3">
          <div className="flex items-start justify-between mb-5">
            <div>
              <div className="font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-white/60 mb-1">Card 02</div>
              <div className="font-grotesk font-bold text-white text-xl tracking-tight leading-tight">
                Facility<br />Analytics
              </div>
            </div>
            <div className="w-9 h-9 bg-white/20 border-2 border-white/40 flex items-center justify-center">
              <Activity size={16} className="text-white" />
            </div>
          </div>

          {[
            { label: 'Hygiene Score', value: 91, icon: <Droplets size={12} />, color: 'bg-brand-yellow' },
            { label: 'Staff Response', value: 78, icon: <Users size={12} />, color: 'bg-brand-pink' },
            { label: 'Service Efficiency', value: 85, icon: <TrendingUp size={12} />, color: 'bg-white' },
          ].map((m) => (
            <div key={m.label} className="mb-4">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5 text-white/70">
                  {m.icon}
                  <span className="font-mono text-[9px] font-bold uppercase tracking-widest">{m.label}</span>
                </div>
                <span className="font-grotesk font-bold text-white text-lg">
                  {m.value}<span className="text-white/40 text-xs font-normal">/100</span>
                </span>
              </div>
              <div className="w-full bg-white/20 h-2 rounded-full">
                <div className={`${m.color} h-2 rounded-full`} style={{ width: `${m.value}%` }} />
              </div>
            </div>
          ))}

          <div className="bg-white/10 border-2 border-white/20 p-3 mt-2">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-mono text-[9px] font-bold uppercase tracking-widest text-white/50 mb-0.5">Open issues</div>
                <div className="font-grotesk font-bold text-white text-2xl">3</div>
              </div>
              <div className="font-mono text-[9px] font-bold bg-brand-yellow text-brand-black px-2 py-1 border border-brand-black">
                ACTION NEEDED
              </div>
            </div>
          </div>
        </div>

        {/* CARD 3 — Yellow — Trend Dashboard */}
        <div className="group bg-brand-yellow border-[3px] border-brand-black shadow-brutal rounded-t-2xl hover:shadow-brutal-lg hover:-translate-y-2 transition-all duration-200 p-6 relative z-10">
          <div className="flex items-start justify-between mb-5">
            <div>
              <div className="font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-brand-black/50 mb-1">Card 03</div>
              <div className="font-grotesk font-bold text-brand-black text-xl tracking-tight leading-tight">
                Trend<br />Dashboard
              </div>
            </div>
            <div className="w-9 h-9 bg-brand-black/10 border-2 border-brand-black/20 flex items-center justify-center">
              <BarChart2 size={16} className="text-brand-black" />
            </div>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
            <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-brand-black/60">Real-time updates</span>
          </div>

          <div className="bg-white/40 border-2 border-brand-black/20 p-3 mb-4">
            <div className="font-mono text-[9px] font-bold uppercase tracking-widest text-brand-black/50 mb-2">30-day satisfaction index</div>
            <MiniLineChart />
            <div className="flex justify-between mt-1">
              <span className="font-mono text-[8px] text-brand-black/40">Apr 22</span>
              <span className="font-mono text-[8px] text-brand-black/40">May 22</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-4">
            {[
              { label: 'Responses', value: '+142%', sub: 'vs last month' },
              { label: 'Avg Rating', value: '\u2191 0.6', sub: 'since rollout' },
            ].map((m) => (
              <div key={m.label} className="bg-white/40 border-2 border-brand-black/20 p-2.5">
                <div className="font-mono text-[8px] font-bold uppercase tracking-widest text-brand-black/50 mb-0.5">{m.label}</div>
                <div className="font-grotesk font-bold text-brand-black text-lg leading-tight">{m.value}</div>
                <div className="font-mono text-[7px] text-brand-black/40 uppercase tracking-wider">{m.sub}</div>
              </div>
            ))}
          </div>

          <div>
            <div className="font-mono text-[9px] font-bold uppercase tracking-widest text-brand-black/50 mb-2">Weekly feedback volume</div>
            <div className="flex items-end gap-[3px] h-10">
              {[30, 55, 45, 70, 60, 85, 100].map((h, i) => (
                <div key={i} className="flex-1 bg-brand-black rounded-sm" style={{ height: `${h}%`, opacity: 0.25 + (i / 6) * 0.75 }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="bg-brand-black border-[3px] border-brand-black px-6 py-4 flex items-center justify-between flex-wrap gap-4" style={{ borderTop: 'none' }}>
        <div className="flex items-center gap-6 flex-wrap">
          {['Food Quality', 'Hygiene', 'Staff Service', 'Facilities', 'Value for Money'].map((cat, i) => (
            <div key={cat} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ background: ['#FF6B9D', '#0057FF', '#FFD600', '#F0F0F0', '#888'][i] }} />
              <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-white/50">{cat}</span>
            </div>
          ))}
        </div>
        <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-white/30">Updated 2 min ago</span>
      </div>
    </div>
  );
}
