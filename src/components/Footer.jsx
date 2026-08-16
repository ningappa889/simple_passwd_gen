import React from 'react';
import { ShieldCheck, Lock, KeyRound, Cpu, Heart } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="mt-16 border-t border-slate-800/80 glass-panel py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Security Alert Recommendation Strip */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3 text-xs text-slate-300">
            <KeyRound className="w-5 h-5 text-cyan-400 shrink-0" />
            <div>
              <strong className="text-slate-100 font-semibold block">Pro Tip for Maximum Security:</strong>
              Never reuse passwords across different accounts. Use an encrypted password manager (e.g. Bitwarden, 1Password) to store your credentials securely.
            </div>
          </div>

          <button
            onClick={() => setActiveTab('security')}
            className="shrink-0 px-3.5 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-medium transition-all"
          >
            Read Security Policy
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800/60 text-xs text-slate-400">
          
          {/* Left copyright & zero-server statement */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              <Lock className="w-3 h-3" />
              <span>SmartPass Client Cryptography</span>
            </div>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">100% Client-Side Web Crypto API</span>
          </div>

          {/* Quick links */}
          <div className="flex items-center space-x-4">
            <button onClick={() => setActiveTab('generator')} className="hover:text-slate-200 transition-colors">
              Generator
            </button>
            <button onClick={() => setActiveTab('how-it-works')} className="hover:text-slate-200 transition-colors">
              How It Works
            </button>
            <button onClick={() => setActiveTab('security')} className="hover:text-slate-200 transition-colors">
              Security
            </button>
            <button onClick={() => setActiveTab('about')} className="hover:text-slate-200 transition-colors">
              About
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
}
