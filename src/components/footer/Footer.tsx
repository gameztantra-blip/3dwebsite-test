import { Sparkles, Github, Twitter, Linkedin, MessageSquare } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const productLinks = [
    { label: 'Autonomous Agents', href: '#features' },
    { label: 'Vector Analytics', href: '#features' },
    { label: '3D Neural Core', href: '#core-3d' },
    { label: 'Developer APIs', href: '#technology' },
    { label: 'Enterprise Security', href: '#technology' }
  ];

  const resourceLinks = [
    { label: 'Architecture Docs', href: '#technology' },
    { label: 'Case Studies', href: '#use-cases' },
    { label: 'Supabase Integration', href: '#contact' },
    { label: 'Platform Availability', href: '#features' },
    { label: 'Engineering Blog', href: '#' }
  ];

  const companyLinks = [
    { label: 'About NEXORA', href: '#' },
    { label: 'Leadership', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Press & Media', href: '#' },
    { label: 'Contact Solutions', href: '#contact' }
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#') && href.length > 1) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#030408] border-t border-white/10 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Column (2 cols on lg) */}
          <div className="lg:col-span-2 flex flex-col items-start pr-4">
            <a
              href="#"
              className="flex items-center gap-2.5 mb-4 group"
              aria-label="NEXORA AI Home"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center p-0.5">
                <div className="w-full h-full bg-[#070b14] rounded-[6px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="font-display text-lg font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                NEXORA AI
              </span>
            </a>

            <p className="text-sm font-medium text-slate-300 italic mb-3">
              &ldquo;Intelligence that moves at the speed of ideas.&rdquo;
            </p>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm mb-6">
              NEXORA AI is an intelligent platform that helps modern engineering and product teams automate complex workflows, analyze multi-modal information, and build production-grade AI-powered applications.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                aria-label="GitHub Repository"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                aria-label="X (Twitter) Profile"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                aria-label="LinkedIn Page"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                aria-label="Discord Community"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold text-xs text-white uppercase tracking-wider mb-4 font-mono">
              Product
            </h4>
            <ul className="space-y-2.5">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className="text-xs hover:text-cyan-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-xs text-white uppercase tracking-wider mb-4 font-mono">
              Resources
            </h4>
            <ul className="space-y-2.5">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className="text-xs hover:text-cyan-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-xs text-white uppercase tracking-wider mb-4 font-mono">
              Company
            </h4>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className="text-xs hover:text-cyan-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Legal row */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {currentYear} NEXORA AI Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Security</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Cookie Preferences</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
