import { useState, useEffect } from 'react';
import { 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Database, 
  Sparkles,
  Info,
  Copy,
  Check
} from 'lucide-react';
import { 
  submitContactMessage, 
  isSupabaseConfigured, 
  validateContactForm,
  ValidationErrors
} from '../../lib/supabase';
import { ContactFormData } from '../../types';

interface ContactFormProps {
  initialSubject?: string;
}

export function ContactForm({ initialSubject }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    message: initialSubject ? `Inquiry regarding: ${initialSubject}\n\n` : '',
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    type: 'idle' | 'success' | 'error';
    message: string;
    isDemo?: boolean;
  }>({ type: 'idle', message: '' });

  const [showSqlHelp, setShowSqlHelp] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  useEffect(() => {
    if (initialSubject) {
      setFormData((prev) => ({
        ...prev,
        message: `Inquiry regarding: ${initialSubject}\n\n`,
      }));
    }
  }, [initialSubject]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Real-time error clearance
    if (errors[name as keyof ValidationErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const currentErrors = validateContactForm(formData);
    if (currentErrors[field as keyof ValidationErrors]) {
      setErrors((prev) => ({
        ...prev,
        [field]: currentErrors[field as keyof ValidationErrors],
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent duplicate submissions while in-flight
    if (isSubmitting) return;

    // Mark all as touched
    setTouched({ name: true, email: true, company: true, message: true });

    // Validate client-side first
    const validationErrors = validateContactForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus({
        type: 'error',
        message: 'Please resolve the highlighted validation errors before sending.',
      });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: 'idle', message: '' });

    try {
      const response = await submitContactMessage(formData);
      setStatus({
        type: 'success',
        message: response.message,
        isDemo: response.isDemoFallback,
      });

      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        company: '',
        message: '',
      });
      setTouched({});
      setErrors({});
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error
          ? err.message
          : 'Failed to send message. Please verify network connectivity and try again.';
      setStatus({
        type: 'error',
        message: errorMsg,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const supabaseSqlSchema = `-- Supabase Table Schema for NEXORA AI
create table if not exists public.contact_messages (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  company text,
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.contact_messages enable row level security;

-- Allow anonymous inserts from web contact form
create policy "Allow public contact message submissions"
on public.contact_messages
for insert
to anon
with check (true);
`;

  const copySqlToClipboard = () => {
    navigator.clipboard.writeText(supabaseSqlSchema);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  return (
    <section id="contact" className="py-24 relative bg-[#05070D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Context & Supabase Information (5 cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex items-center gap-2 text-xs font-medium text-cyan-400 tracking-wide uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct Solutions Consultation</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Ready to Accelerate Your AI Deployment?
            </h2>

            <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
              Connect with our enterprise engineering team. We’ll analyze your workflow specifications, recommend optimal model configurations, and provide a direct path to production.
            </p>

            {/* Supabase Integration Badge / Status info */}
            <div className="mt-8 p-5 rounded-2xl bg-[#090d1a] border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                  <Database className="w-4 h-4 text-cyan-400" />
                  <span>Database Pipeline</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isSupabaseConfigured ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                    }`}
                  />
                  <span className="text-[11px] font-mono text-slate-300">
                    {isSupabaseConfigured ? 'Supabase Connected' : 'Preview Buffer Mode'}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                {isSupabaseConfigured
                  ? 'Submissions route directly to the PostgreSQL contact_messages table via Supabase client with RLS security policies.'
                  : 'Running with local buffer persistence. Configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to pipe to your live Supabase project.'}
              </p>

              <button
                type="button"
                onClick={() => setShowSqlHelp(!showSqlHelp)}
                className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 rounded"
              >
                <Info className="w-3.5 h-3.5" />
                <span>{showSqlHelp ? 'Hide' : 'View'} Supabase Schema SQL</span>
              </button>

              {showSqlHelp && (
                <div className="mt-3 p-3 rounded-xl bg-black/60 border border-white/10 font-mono text-[11px] text-slate-300 relative">
                  <div className="flex justify-between items-center pb-2 border-b border-white/10 mb-2">
                    <span className="text-slate-400 text-[10px]">table: contact_messages</span>
                    <button
                      type="button"
                      onClick={copySqlToClipboard}
                      className="flex items-center gap-1 text-[10px] text-cyan-400 hover:text-white"
                    >
                      {copiedSql ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedSql ? 'Copied' : 'Copy SQL'}</span>
                    </button>
                  </div>
                  <pre className="overflow-x-auto text-[10px] leading-tight text-slate-300 whitespace-pre">
                    {supabaseSqlSchema}
                  </pre>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#090e1c] border border-white/10 shadow-2xl shadow-cyan-950/30">
              {/* Status Alert Banner */}
              {status.type === 'success' && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3 animate-in fade-in duration-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-emerald-300">Message Delivered</h4>
                    <p className="text-xs text-emerald-200/90 mt-0.5">{status.message}</p>
                  </div>
                </div>
              )}

              {status.type === 'error' && (
                <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 animate-in fade-in duration-200">
                  <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-rose-300">Submission Error</h4>
                    <p className="text-xs text-rose-200/90 mt-0.5">{status.message}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Your Name <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={() => handleBlur('name')}
                    placeholder="e.g. Elena Vance"
                    disabled={isSubmitting}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    className={`w-full px-4 py-3 rounded-xl bg-black/40 border text-sm text-white placeholder-slate-500 transition-all duration-200 focus:outline-none focus:ring-2 ${
                      errors.name && touched.name
                        ? 'border-rose-500/50 focus:ring-rose-500/30'
                        : 'border-white/10 hover:border-white/20 focus:border-cyan-400 focus:ring-cyan-500/20'
                    }`}
                  />
                  {errors.name && touched.name && (
                    <p id="name-error" className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Work Email <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={() => handleBlur('email')}
                    placeholder="elena@enterprise.com"
                    disabled={isSubmitting}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    className={`w-full px-4 py-3 rounded-xl bg-black/40 border text-sm text-white placeholder-slate-500 transition-all duration-200 focus:outline-none focus:ring-2 ${
                      errors.email && touched.email
                        ? 'border-rose-500/50 focus:ring-rose-500/30'
                        : 'border-white/10 hover:border-white/20 focus:border-cyan-400 focus:ring-cyan-500/20'
                    }`}
                  />
                  {errors.email && touched.email && (
                    <p id="email-error" className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                {/* Company Field (Optional) */}
                <div>
                  <label htmlFor="company" className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Company / Organization <span className="text-slate-500 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="e.g. Apex Global Systems"
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 hover:border-white/20 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Project Details & Goals <span className="text-cyan-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={() => handleBlur('message')}
                    placeholder="Describe your current bottleneck, target scale, or workflows you wish to automate..."
                    disabled={isSubmitting}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    className={`w-full px-4 py-3 rounded-xl bg-black/40 border text-sm text-white placeholder-slate-500 transition-all duration-200 resize-none focus:outline-none focus:ring-2 ${
                      errors.message && touched.message
                        ? 'border-rose-500/50 focus:ring-rose-500/30'
                        : 'border-white/10 hover:border-white/20 focus:border-cyan-400 focus:ring-cyan-500/20'
                    }`}
                  />
                  {errors.message && touched.message && (
                    <p id="message-error" className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-xl font-semibold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-400 hover:from-cyan-300 hover:to-sky-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-200 flex items-center justify-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4 text-slate-950" />
                      </>
                    )}
                  </button>
                  <p className="mt-3 text-center text-xs text-slate-500">
                    Encrypted submission · Never shared with unauthorized third parties
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
