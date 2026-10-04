import { useState } from 'react';
import { SceneCore } from './SceneCore';
import { Eye, RotateCcw, Zap, Compass, Layers } from 'lucide-react';

export function CoreExperience3D() {
  const [intensity, setIntensity] = useState<number>(1.1);
  const [activePreset, setActivePreset] = useState<'standard' | 'amplified' | 'stealth'>('standard');

  const handlePresetChange = (preset: 'standard' | 'amplified' | 'stealth') => {
    setActivePreset(preset);
    if (preset === 'standard') setIntensity(1.1);
    if (preset === 'amplified') setIntensity(1.6);
    if (preset === 'stealth') setIntensity(0.7);
  };

  return (
    <section id="core-3d" className="py-24 relative overflow-hidden bg-[#030509] border-y border-white/10">
      {/* Background radial gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] bg-gradient-to-b from-cyan-600/10 via-blue-600/5 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Interactive 3D Canvas (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center">
            <div className="relative w-full aspect-square max-w-[560px] rounded-3xl p-1 bg-gradient-to-b from-white/10 to-transparent border border-white/10 shadow-2xl shadow-cyan-950/40">
              <div className="w-full h-full rounded-[22px] overflow-hidden bg-[#060a14] relative">
                <SceneCore
                  className="w-full h-full min-h-[420px]"
                  intensity={intensity}
                  cameraDistance={4.8}
                  showStatusOverlay={true}
                />

                {/* Top Corner Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/50 backdrop-blur-md border border-white/10 text-xs font-mono text-cyan-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  <span>NEXORA-SYNAPSE-v1</span>
                </div>
              </div>
            </div>

            {/* Subtle helper note */}
            <p className="mt-3 text-xs text-slate-500 flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              <span>Hover and drag cursor across the sphere to orbit spatial perspective</span>
            </p>
          </div>

          {/* Right Column: Architectural Core Specs & Interactive Modifiers (5 cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex items-center gap-2 text-xs font-medium text-cyan-400 tracking-wide uppercase mb-3">
              <Zap className="w-3.5 h-3.5" />
              <span>3D Spatial Spatial Engine</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              The NEXORA Autonomous Neural Core
            </h2>

            <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              At the epicenter of our distributed architecture is a continuous-state model router that synchronizes context vectors, manages dynamic model weights, and executes parallel task graphs.
            </p>

            {/* Interactive Simulation Controls */}
            <div className="mt-8 p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
              <div className="flex items-center justify-between text-xs font-medium text-slate-300">
                <span className="flex items-center gap-2">
                  <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Orbital Dynamics State</span>
                </span>
                <span className="font-mono text-cyan-400 uppercase text-[11px]">
                  {activePreset} mode
                </span>
              </div>

              {/* Segmented Preset Switcher */}
              <div className="grid grid-cols-3 gap-2 p-1 bg-black/40 rounded-xl border border-white/5">
                {(['stealth', 'standard', 'amplified'] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => handlePresetChange(mode)}
                    className={`py-2 text-xs font-medium rounded-lg capitalize transition-all duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 ${
                      activePreset === mode
                        ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-400/40 shadow-sm'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Structural Layers Details */}
            <div className="mt-6 space-y-3">
              <div className="p-3.5 rounded-xl bg-[#090d1a] border border-white/5 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Layers className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white">Central Plasma Sphere</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Emissive energy core managing semantic session memory locks.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#090d1a] border border-white/5 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Eye className="w-4 h-4 text-indigo-400" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white">Triple Orbital Gyroscopes</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Decoupled multi-angle rings simulating real-time model consensus.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
