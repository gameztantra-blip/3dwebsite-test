import { ArrowRight, Play, Cpu, ShieldCheck, Zap } from 'lucide-react';
import { SceneCore } from '../experience3d/SceneCore';

interface HeroProps {
  onStartBuilding?: () => void;
}

export function Hero({ onStartBuilding }: HeroProps) {
  const handleScrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-grid-subtle">
      {/* Ambient background glow & atmospheric vignettes */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-cyan-600/15 via-blue-600/10 to-indigo-600/5 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute -top-32 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typography & CTAs (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
            {/* Clean unboxed editorial kicker without pill badge enclosure per design rules */}
            <div className="flex items-center gap-2 text-xs font-medium text-cyan-400 tracking-wide uppercase mb-4">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>Autonomous Workflow Platform</span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span className="text-slate-400">Enterprise AI Synthesis</span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] max-w-2xl text-balance">
              Build What’s <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-sky-400">
                Next With AI.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl font-normal">
              Turn complex ideas into intelligent products, automated workflows and scalable digital experiences.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => {
                  if (onStartBuilding) {
                    onStartBuilding();
                  } else {
                    handleScrollTo('#contact');
                  }
                }}
                className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-400 hover:from-cyan-300 hover:to-sky-300 rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <span>Start Building</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => handleScrollTo('#features')}
                className="w-full sm:w-auto px-6 py-3.5 text-sm font-medium text-slate-200 bg-slate-900/80 hover:bg-slate-800/90 border border-white/10 hover:border-cyan-400/40 rounded-xl backdrop-blur-sm transition-all duration-200 flex items-center justify-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <Play className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
                <span>Explore Platform</span>
              </button>
            </div>

            {/* Proof signals adjacent to claim per Claim-to-Proof Adjacency */}
            <div className="mt-12 pt-8 border-t border-white/10 w-full max-w-xl grid grid-cols-3 gap-4">
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                  <Zap className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Sub-second</span>
                </div>
                <span className="text-sm font-semibold text-white mt-1">Real-time sync</span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                  <Cpu className="w-3.5 h-3.5 text-sky-400" />
                  <span>Adaptive</span>
                </div>
                <span className="text-sm font-semibold text-white mt-1">Multi-model routing</span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                  <span>Compliant</span>
                </div>
                <span className="text-sm font-semibold text-white mt-1">SOC 2 Type II</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D AI Core (5 cols) */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[420px] sm:min-h-[480px]">
            {/* Subtle background ambient rings and glow aura */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[320px] sm:w-[420px] h-[320px] sm:h-[420px] rounded-full border border-cyan-500/10 border-dashed animate-[spin_40s_linear_infinite]" />
              <div className="w-[260px] sm:w-[340px] h-[260px] sm:h-[340px] rounded-full border border-blue-500/15" />
            </div>

            <div className="w-full h-[400px] sm:h-[480px] relative z-10">
              <SceneCore
                className="w-full h-full"
                cameraDistance={5.2}
                intensity={1.1}
                showStatusOverlay={true}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
