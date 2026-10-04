import { useState } from 'react';
import { 
  User, 
  Cpu, 
  Workflow, 
  Database, 
  LineChart, 
  ArrowRight, 
  Sparkles,
  Layers,
  Cloud,
  Code2,
  Server
} from 'lucide-react';

interface PipelineStage {
  id: string;
  step: string;
  name: string;
  icon: typeof User;
  summary: string;
  details: string[];
  latency: string;
}

export function TechnologyFlow() {
  const [activeStageIndex, setActiveStageIndex] = useState(1);

  const pipelineStages: PipelineStage[] = [
    {
      id: 'user',
      step: '01',
      name: 'USER',
      icon: User,
      summary: 'Triggers action via API payload, Webhook, Chat interface, or schedule event.',
      details: [
        'Multi-channel ingress (REST, GraphQL, gRPC)',
        'Zero-trust cryptographic signature authentication',
        'Payload normalization & validation'
      ],
      latency: '< 5ms'
    },
    {
      id: 'ai-platform',
      step: '02',
      name: 'AI PLATFORM',
      icon: Cpu,
      summary: 'Orchestrates intent parsing, contextual memory retrieval, and optimal model routing.',
      details: [
        'Dynamic multi-model consensus router',
        'Sub-second semantic vector lookups',
        'Deterministic guardrails & safety filtering'
      ],
      latency: '45ms'
    },
    {
      id: 'automation',
      step: '03',
      name: 'AUTOMATION',
      icon: Workflow,
      summary: 'Executes parallel workflow graph with idempotency guarantees and rollback state.',
      details: [
        'Directed Acyclic Graph (DAG) executor',
        'Stateful step checkpoints in PostgreSQL',
        'Autonomous error remediation loops'
      ],
      latency: '22ms'
    },
    {
      id: 'data',
      step: '04',
      name: 'DATA',
      icon: Database,
      summary: 'Synchronizes normalized records with transactional stores, vector embeddings, and cold storage.',
      details: [
        'High-throughput read/write replicas',
        'Automated embedding re-indexing',
        'Enterprise compliant data residency'
      ],
      latency: '14ms'
    },
    {
      id: 'insights',
      step: '05',
      name: 'INSIGHTS',
      icon: LineChart,
      summary: 'Delivers actionable summaries, predictive signals, and automated downstream webhooks.',
      details: [
        'Streaming telemetry & anomaly alerts',
        'Automated executive trend summaries',
        'Bidirectional client synchronization'
      ],
      latency: '< 10ms'
    }
  ];

  const techStackPillars = [
    { title: 'Generative AI', desc: 'Hybrid reasoning models with semantic routing', icon: Sparkles },
    { title: 'Cloud Scale', desc: 'Global serverless edge execution nodes', icon: Cloud },
    { title: 'Developer APIs', desc: 'OpenAPI type-safe SDKs & instant webhooks', icon: Code2 },
    { title: 'Workflow Automation', desc: 'Deterministic state machine orchestration', icon: Layers },
    { title: 'Unified Data', desc: 'Relational PostgreSQL with Vector search', icon: Database },
    { title: 'Enterprise Infrastructure', desc: 'SOC 2 compliant, zero-downtime clustering', icon: Server }
  ];

  const currentStage = pipelineStages[activeStageIndex];

  return (
    <section id="technology" className="py-24 relative bg-[#05070D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 text-xs font-medium text-cyan-400 tracking-wide uppercase mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Architecture & Data Flow</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            How Information Moves Through NEXORA
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-2xl text-balance">
            An end-to-end execution pipeline engineered to turn ambiguous inputs into validated enterprise operations.
          </p>
        </div>

        {/* Animated Flow Diagram: USER → AI PLATFORM → AUTOMATION → DATA → INSIGHTS */}
        <div className="relative p-6 sm:p-8 rounded-3xl bg-[#080d1a] border border-white/10 shadow-2xl mb-16">
          {/* Top Stage Tracker Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 relative z-10">
            {pipelineStages.map((stage, idx) => {
              const Icon = stage.icon;
              const isActive = activeStageIndex === idx;

              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => setActiveStageIndex(idx)}
                  className={`group relative p-4 rounded-xl text-left transition-all duration-200 border flex flex-col justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                    isActive
                      ? 'bg-gradient-to-b from-[#131d36] to-[#0c1324] border-cyan-400/50 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-500/30'
                      : 'bg-white/[0.02] hover:bg-white/[0.05] border-white/5 hover:border-white/15'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-3">
                    <span className="font-mono text-xs text-slate-500 group-hover:text-cyan-400 transition-colors">
                      {stage.step}
                    </span>
                    <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-200'}`} />
                  </div>

                  <div>
                    <span className="block font-display text-sm font-bold tracking-tight text-white group-hover:text-cyan-300">
                      {stage.name}
                    </span>
                    <span className="text-[11px] font-mono text-cyan-400/80 mt-1 block">
                      {stage.latency}
                    </span>
                  </div>

                  {/* Active Indicator Bar */}
                  {isActive && (
                    <div className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-cyan-400 to-sky-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Interactive Inspection Detail Card */}
          <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
                <span>STAGE {currentStage.step}</span>
                <span aria-hidden="true">·</span>
                <span>{currentStage.name} SUBSYSTEM</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-white">
                {currentStage.name} Execution Layer
              </h3>
              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                {currentStage.summary}
              </p>
            </div>

            <div className="lg:col-span-6 space-y-2.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                Engine Specifications
              </span>
              {currentStage.details.map((detail, dIdx) => (
                <div key={dIdx} className="flex items-center gap-3 p-3 rounded-lg bg-black/40 border border-white/5">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                  <span className="text-xs sm:text-sm text-slate-300 font-mono">
                    {detail}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 6 Core Technology Pillars (AI, Cloud, APIs, Automation, Data, Infrastructure) */}
        <div>
          <div className="text-center mb-8">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
              Foundation Pillars
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Modular infrastructure powering our scalable enterprise solutions.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {techStackPillars.map((pillar, pIdx) => {
              const PillarIcon = pillar.icon;
              return (
                <div
                  key={pIdx}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/20 hover:bg-white/[0.04] transition-all flex flex-col justify-between"
                >
                  <PillarIcon className="w-5 h-5 text-cyan-400 mb-3" />
                  <div>
                    <h4 className="text-xs font-semibold text-white">{pillar.title}</h4>
                    <p className="text-[11px] text-slate-400 mt-1 leading-snug">{pillar.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
