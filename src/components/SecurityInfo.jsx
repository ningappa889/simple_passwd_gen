import React from 'react';
import { ShieldCheck, Lock, EyeOff, Cpu, KeyRound, AlertOctagon, CheckCircle2 } from 'lucide-react';

export default function SecurityInfo() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      
      {/* Zero Server Guarantee Hero Card */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-emerald-500/30 text-center space-y-4 bg-gradient-to-b from-emerald-500/10 via-slate-900/60 to-slate-900/90 shadow-cyber-glow">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mb-1">
          <Lock className="w-7 h-7 animate-pulse" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
          Your generated password never leaves your device.
        </h1>

        <p className="text-slate-300 text-sm max-w-2xl mx-auto leading-relaxed">
          SmartPass executes 100% inside your Web Browser's local JavaScript execution context. No network API calls are made, no telemetry is tracked, and no generated passwords are ever transmitted or stored.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono text-xs font-semibold">
            ✔ Zero Network Requests
          </span>
          <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-mono text-xs font-semibold">
            ✔ Cryptographic Web Crypto API
          </span>
          <span className="px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/40 font-mono text-xs font-semibold">
            ✔ Zero Disk / Cookie Storage
          </span>
        </div>
      </div>

      {/* Cryptographic Standards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-3">
          <div className="flex items-center space-x-2 text-cyan-400">
            <Cpu className="w-5 h-5" />
            <h3 className="font-bold text-base text-slate-100">Cryptographically Secure Randomness</h3>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Standard random functions like <code className="text-amber-400 font-mono">Math.random()</code> use pseudo-random PRNG algorithms that are predictable and unsuitable for security. SmartPass uses <code className="text-emerald-400 font-mono">window.crypto.getRandomValues()</code>, leveraging hardware entropy provided directly by your operating system kernel.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-3">
          <div className="flex items-center space-x-2 text-emerald-400">
            <EyeOff className="w-5 h-5" />
            <h3 className="font-bold text-base text-slate-100">Zero Data Persistence Policy</h3>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Generated passwords are never saved to <code className="text-slate-300 font-mono">LocalStorage</code>, <code className="text-slate-300 font-mono">SessionStorage</code>, cookies, indexedDB, or server logs. Optional session history exists only in volatile RAM memory and is wiped clean the second you refresh the browser page.
          </p>
        </div>

      </div>

      {/* Best Security Practices Checklist */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-5">
        <div className="flex items-center space-x-3">
          <ShieldCheck className="w-6 h-6 text-emerald-400" />
          <h2 className="text-lg font-bold text-slate-100">Essential Cybersecurity Recommendations</h2>
        </div>

        <div className="space-y-3 text-xs text-slate-300">
          
          <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-100 text-sm block mb-0.5">Never Reuse Passwords Across Accounts</strong>
              If one service suffers a credential breach, reusing passwords allows attackers to execute automated credential stuffing across all your accounts.
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <KeyRound className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-100 text-sm block mb-0.5">Use a Reputable Password Manager</strong>
              Store your unique generated passwords in an encrypted zero-knowledge password manager (such as Bitwarden, 1Password, or KeePassXC) rather than writing them on sticky notes.
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <AlertOctagon className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-100 text-sm block mb-0.5">Always Enable Multi-Factor Authentication (MFA / 2FA)</strong>
              Even the strongest password can be compromised via phishing. MFA (TOTP authenticator apps or security keys) adds an essential second defense layer.
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
