import { useState } from 'react';
import { 
  Bot, 
  BarChart3, 
  GitBranch, 
  Cpu, 
  Cloud, 
  Terminal, 
  ArrowUpRight, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface FeatureCardData {
  id: string;
  title: string;
  description: string;
  icon: typeof Bot;
  category: string;
  metric: string;
  capabilities: string[];
}

export function Features() {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  const features: FeatureCardData[] = [
    {
      id: 'ai-automation',
      title: 'AI Automation',
      description:
        'Deploy deterministic autonomous agents that handle multi-step business logic, decision trees, and exception management without human bottlenecks.',
      icon: Bot,
      category: 'Autonomous Systems',
      metric: '82% Reduction in manual touchpoints',
      capabilities: ['Self-healing workflow agents', 'Multi-modal context evaluation', 'Human-in-the-loop escalation paths'],
    },
    {
      id: 'intelligent-analytics',
      title: 'Intelligent Analytics',
      description:
        'Transform high-volume enterprise telemetry and unstructured documents into actionable vector intelligence and real-time executive summaries.',
      icon: BarChart3,
      category: 'Vector Intelligence',
      metric: '< 18ms semantic vector search',
      capabilities: ['Automated trend inflection alerts', 'Context-aware semantic clustering', 'Dynamic schema deduction'],
    },
    {
      id: 'workflow-orchestration',
      title: 'Workflow Orchestration',
      description:
        'Visually connect APIs, databases, queue workers, and generative microservices into resilient, event-driven execution graphs.',
      icon: GitBranch,
      category: 'Distributed Pipelines',
      metric: 'Zero-loss state persistence',
      capabilities: ['Distributed rollback transactions', 'Dynamic DAG dependency resolver', 'Edge execution guarantees'],
    },
    {
      id: 'real-time-intelligence',
      title: 'Real-Time Intelligence',
      description:
        'Process live sensory streams, websocket events, and conversational interactions with sub-second latency and persistent memory locks.',
      icon: Cpu,
      category: 'Sub-second Inference',
      metric: '120ms p99 response threshold',
      capabilities: ['Stateful thread caching', 'Dynamic token stream optimization', 'Multi-region failover mesh'],
    },
    {
      id: 'cloud-scale',
      title: 'Cloud Scale',
      description:
        'Elastic infrastructure engineered to scale seamlessly from thousands of daily queries to tens of millions of concurrent worker cycles.',
      icon: Cloud,
      category: 'Global Infrastructure',
      metric: '99.99% multi-region SLA',
      capabilities: ['Zero-cold-start inference pool', 'Auto-scaling vector databases', 'Geo-distributed model caching'],
    },
    {
      id: 'developer-apis',
      title: 'Developer APIs',
      description:
        'Ergonomic SDKs for TypeScript, Python, and Go, coupled with comprehensive OpenAPI schemas, webhooks, and local sandbox environments.',
      icon: Terminal,
      category: 'Developer Experience',
      metric: '5-minute time to first payload',
      capabilities: ['Type-safe client generation', 'Granular token telemetry', 'Deterministic replay testing'],
    },
  ];

  return (
    <section id="features" className="py-24 relative bg-[#05070D]">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/10 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-medium text-cyan-400 tracking-wide uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Core Platform Capabilities</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Engineered for Enterprise Autonomy
            </h2>
          </div>
          <p className="text-slate-400 text-sm sm:text-base max-w-md">
            Every layer of NEXORA is built to eliminate operational friction, guarantee predictability, and accelerate production deployment.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item) => {
            const Icon = item.icon;
            const isSelected = activeFeature === item.id;

            return (
              <div
                key={item.id}
                onClick={() => setActiveFeature(isSelected ? null : item.id)}
                className={`group relative rounded-2xl p-7 border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#0f172a] border-cyan-400/40 shadow-xl shadow-cyan-950/40 ring-1 ring-cyan-500/30'
                    : 'bg-[#090d1a]/80 hover:bg-[#0d1428] border-white/10 hover:border-cyan-500/30 shadow-md hover:shadow-cyan-950/20'
                }`}
              >
                {/* Top header row */}
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:scale-105 group-hover:border-cyan-400/40 transition-all duration-200">
                      <Icon className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-slate-500 group-hover:text-slate-300 transition-colors">
                      <span className="font-mono text-[11px]">{item.category}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>

                  <h3 className="font-display text-xl font-bold text-white group-hover:text-cyan-200 transition-colors">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm text-slate-300 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                {/* Subdued metric proof & capabilities */}
                <div className="mt-6 pt-5 border-t border-white/10">
                  <div className="text-xs font-mono text-cyan-400 mb-3 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>{item.metric}</span>
                  </div>

                  {/* Expandable technical details */}
                  <div className="space-y-1.5">
                    {item.capabilities.map((cap, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span className="truncate">{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
