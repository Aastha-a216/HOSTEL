import { Radio } from 'lucide-react';

export default function FloatingBadge() {
  return (
    <div className="animate-float">
      <div className="relative w-28 h-28 lg:w-32 lg:h-32">
        <svg className="absolute inset-0 w-full h-full animate-spin-slow" viewBox="0 0 128 128">
          <defs>
            <path id="circle-path" d="M64,64 m-52,0 a52,52 0 1,1 104,0 a52,52 0 1,1 -104,0" />
          </defs>
          <text className="fill-brand-black" style={{ fontSize: '10.5px', fontFamily: '"Space Mono", monospace', fontWeight: 700, letterSpacing: '0.15em' }}>
            <textPath href="#circle-path">LIVE DATA • SMART TRACKING • 1000+ FEEDBACKS • </textPath>
          </text>
        </svg>
        <div className="absolute inset-4 bg-brand-blue border-2 border-brand-black shadow-brutal-sm rounded-full flex flex-col items-center justify-center gap-0.5">
          <Radio size={16} className="text-white" strokeWidth={2.5} />
          <span className="font-mono text-[8px] font-bold text-white uppercase tracking-wider leading-tight text-center">
            LIVE<br />NOW
          </span>
        </div>
      </div>
    </div>
  );
}
