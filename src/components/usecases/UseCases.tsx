import { useState } from 'react';
import { 
  Headphones, 
  Terminal, 
  TrendingUp, 
  FileText, 
  ArrowRight, 
  Check, 
  Sparkles,
  Layers,
  ShieldAlert
} from 'lucide-react';
import { UseCaseItem } from '../../types';

interface UseCasesProps {
  onSelectUseCase?: (title: string) => void;
}

export function UseCases({ onSelectUseCase }: UseCasesProps) {
  const [activeTab, setActiveTab] = useState('all');

  const useCases: UseCaseItem[] = [
    {
      id: 'support',
      title: 'AI Customer Support',
      tagline: 'Autonomous Multi-Tier Ticket Resolution',
      description:
        'Resolves 74% of enterprise support inquiries autonomously by parsing tickets, verifying user identity, consulting internal documentation, and triggering system updates.',
      techTags: ['Vector Semantic RAG', 'Multi-Modal Voice & Chat', 'CRM Webhooks', 'Human Escalation'],
      metricLabel: 'Autonomous Resolution Rate',
      metricValue: '74.2%',
      workflowSteps: [
        'Ingest user issue via Zendesk or Slack',
        'Retrieve user context from billing & usage DB',
        'Synthesize solution & run API action',
        'Verify resolution & request satisfaction score'
      ]
    },
    {
      id: 'devops',
      title: 'Automated DevOps',
      tagline: 'Self-Healing Cloud Infrastructure',
      description:
        'Continuously monitors CI/CD builds, alerts, and production logs. Diagnoses deployment anomalies, rolls back broken revisions, and opens pull requests with remediation code.',
      techTags: ['Kubernetes Operators', 'Log Anomaly Detection', 'GitOps Sync', 'Canary Rollouts'],
      metricLabel: 'Mean Time to Recovery (MTTR)',
      metricValue: '4.1 min',
      workflowSteps: [
        'Detect latency spike in Prometheus metrics',
        'Correlate root cause in container trace logs',
        'Trigger safe rollback to last verified hash',
        'Create PR with reproduction unit test'
      ]
    },
    {
      id: 'analytics',
      title: 'Intelligent Data Analysis',
      tagline: 'Predictive Financial & Operational Intelligence',
      description:
        'Ingests millions of telemetry events, ERP records, and marketing metrics. Automatically extracts market shift signals, detects fraud vectors, and creates executive briefings.',
      techTags: ['PostgreSQL & pgvector', 'Dynamic Trend Deduction', 'Synthetic Backtesting', 'Automated BI'],
      metricLabel: 'Forecast Horizon Accuracy',
      metricValue: '96.8%',
      workflowSteps: [
        'Stream raw records from transactional DBs',
        'Perform multi-variate statistical synthesis',
        'Project 30-day forecast confidence curves',
        'Dispatch push alert to financial controllers'
      ]
    },
    {
      id: 'content',
      title: 'AI Content Operations',
      tagline: 'Multi-Channel Brand Narrative Engine',
      description:
        'Orchestrates tone-consistent technical documentation, product localization across 34 languages, and customer marketing collateral with built-in editorial review gates.',
      techTags: ['Semantic Style Enforcer', '34-Language Localization', 'SEO Vector Tuning', 'CMS Publishing'],
      metricLabel: 'Localization Turnaround Time',
      metricValue: '12 min',
      workflowSteps: [
        'Parse release notes from Github pull request',
        'Generate structured docs adhering to styleguide',
        'Translate and adapt cultural nuances for 34 locales',
        'Publish staged articles directly to CMS'
      ]
    }
  ];

  const handleCtaClick = (title: string) => {
    if (onSelectUseCase) {
      onSelectUseCase(title);
    } else {
      const el = document.querySelector('#contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="use-cases" className="py-24 relative bg-[#030509]">
      {/* Background illumination */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-cyan-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 text-xs font-medium text-cyan-400 tracking-wide uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Proven Enterprise Implementations</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Real-World Impact Across Core Domains
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-2xl text-balance">
            Explore how modern teams deploy NEXORA to automate mission-critical workflows with zero compromise on precision.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {useCases.map((uc, index) => {
            return (
              <div
                key={uc.id}
                className="group relative rounded-3xl p-8 bg-[#070b14] border border-white/10 hover:border-cyan-500/30 transition-all duration-300 shadow-xl flex flex-col justify-between"
              >
                <div>
                  {/* Top metadata & metric indicator */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                    <span className="font-mono text-xs text-slate-500 uppercase">
                      CASE STUDY 0{index + 1}
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs text-slate-400 font-mono">
                        {uc.metricLabel}:
                      </span>
                      <span className="font-mono text-sm font-bold text-cyan-400">
                        {uc.metricValue}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {uc.title}
                  </h3>
                  <p className="text-xs font-medium text-cyan-400/90 mt-1 uppercase tracking-wider">
                    {uc.tagline}
                  </p>

                  <p className="mt-4 text-sm text-slate-300 leading-relaxed">
                    {uc.description}
                  </p>

                  {/* Clean unboxed metadata with separators per design rules */}
                  <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-400">
                    <span className="text-slate-500 font-medium">Stack:</span>
                    {uc.techTags.map((tag, tIdx) => (
                      <span key={tIdx} className="flex items-center gap-2">
                        <span className="text-slate-300">{tag}</span>
                        {tIdx < uc.techTags.length - 1 && (
                          <span className="text-slate-600" aria-hidden="true">·</span>
                        )}
                      </span>
                    ))}
                  </div>

                  {/* Automated Execution Workflow preview */}
                  <div className="mt-6 p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                    <span className="text-[11px] font-mono uppercase text-slate-400 tracking-wider block">
                      Autonomous Pipeline Sequence
                    </span>
                    {uc.workflowSteps.map((step, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2.5 text-xs text-slate-300">
                        <span className="w-4 h-4 rounded-full bg-cyan-500/10 text-cyan-400 font-mono text-[10px] flex items-center justify-center shrink-0">
                          {sIdx + 1}
                        </span>
                        <span className="truncate">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA trigger */}
                <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    Production verified
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCtaClick(uc.title)}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 group-hover:translate-x-1 transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 rounded px-1"
                  >
                    <span>Deploy This Solution</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
