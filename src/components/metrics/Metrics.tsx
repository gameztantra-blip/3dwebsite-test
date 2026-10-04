import { useEffect, useRef, useState } from 'react';
import { Activity, ShieldCheck, Layers, Clock } from 'lucide-react';

interface MetricItem {
  target: number;
  suffix: string;
  decimals?: number;
  label: string;
  description: string;
  icon: typeof Activity;
}

export function Metrics() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);

  const metricsData: MetricItem[] = [
    {
      target: 99.9,
      decimals: 1,
      suffix: '%',
      label: 'Platform Availability',
      description: 'Zero single point of failure multi-region cloud cluster',
      icon: ShieldCheck,
    },
    {
      target: 10,
      suffix: 'M+',
      label: 'AI Operations',
      description: 'Autonomous worker cycles executed every month',
      icon: Activity,
    },
    {
      target: 40,
      suffix: '+',
      label: 'Integrations',
      description: 'Native enterprise connectors across databases & APIs',
      icon: Layers,
    },
    {
      target: 24,
      suffix: '/7',
      label: 'Automation',
      description: 'Continuous background monitoring & automated recovery',
      icon: Clock,
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.25 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 1400; // ms
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Smooth easeOutCubic curve
      const eased = 1 - Math.pow(1 - progress, 3);

      setCounts(metricsData.map((m) => m.target * eased));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [isVisible]);

  return (
    <section ref={containerRef} className="py-20 relative bg-[#05070D] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {metricsData.map((metric, idx) => {
            const Icon = metric.icon;
            const currentVal = counts[idx] ?? 0;
            const formattedVal =
              metric.decimals !== undefined
                ? currentVal.toFixed(metric.decimals)
                : Math.round(currentVal).toString();

            return (
              <div
                key={idx}
                className={`flex flex-col items-start ${
                  idx !== 0 ? 'pt-8 sm:pt-0 sm:pl-8' : ''
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-cyan-400" />
                </div>

                <div className="flex items-baseline gap-1 font-mono text-4xl sm:text-5xl font-extrabold text-white tracking-tight tabular-nums">
                  <span>{formattedVal}</span>
                  <span className="text-cyan-400 text-3xl sm:text-4xl">{metric.suffix}</span>
                </div>

                <h3 className="font-display text-base font-bold text-white mt-2">
                  {metric.label}
                </h3>

                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {metric.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
