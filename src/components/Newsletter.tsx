import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { newsletterApi } from '../api';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    try {
      await newsletterApi.subscribe(email);
      setStatus('success');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setErrorMessage('Failed to subscribe. Please try again.');
    }
  };

  return (
    <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-[#111215] text-white rounded-3xl p-8 sm:p-14 border border-white/10 shadow-2xl relative overflow-hidden text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-mono text-neutral-300 mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#C84323]" />
          <span>Payfrica Dispatch · Weekly Editorial</span>
        </div>

        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 text-balance">
          Stay ahead of the money movement.
        </h2>

        <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
          Get the latest Payfrica stories, protocol updates, and deep dives on Africa’s evolving digital economy delivered to your inbox every Sunday.
        </p>

        {status === 'success' ? (
          <div className="bg-white/10 border border-emerald-500/40 rounded-2xl p-6 max-w-md mx-auto flex items-center justify-center gap-3 text-emerald-300 animate-in fade-in duration-300">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <div className="text-left text-xs sm:text-sm">
              <span className="font-semibold block text-white">You're subscribed!</span>
              Check your inbox for the latest Payfrica Journal edition.
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-neutral-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  placeholder="Enter your work email"
                  className="w-full pl-11 pr-4 py-3 rounded-full bg-white/10 border border-white/15 text-white placeholder-neutral-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#C84323] transition-all"
                  disabled={status === 'loading'}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#C84323] hover:bg-[#B0381D] active:bg-[#9B2F17] text-white font-semibold text-sm transition-all duration-200 shadow-md shadow-[#C84323]/25 cursor-pointer whitespace-nowrap"
              >
                <span>{status === 'loading' ? 'Joining...' : 'Subscribe'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {status === 'error' && (
              <p className="text-xs text-rose-400 mt-2.5 text-center">
                {errorMessage}
              </p>
            )}

            <div className="flex items-center justify-center gap-4 text-[11px] text-neutral-500 mt-4">
              <span>Zero spam</span>
              <span>·</span>
              <span>Unsubscribe anytime</span>
              <span>·</span>
              <span>Read by 12,000+ builders</span>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
