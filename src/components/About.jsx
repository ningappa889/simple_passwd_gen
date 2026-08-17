import React from 'react';
import { ShieldCheck, Heart, Terminal, Sparkles, Lock, Code2, Globe } from 'lucide-react';

export default function About() {
  return (
    <div className="w-full space-y-8 animate-fadeIn">
      
      {/* Hero Banner */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 text-center space-y-4">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-1">
          <ShieldCheck className="w-6 h-6" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
          About SmartPass
        </h1>

        <p className="text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed">
          SmartPass is an open cybersecurity utility built to empower individuals and organizations with strong, unique, and memorable account credentials.
        </p>
      </div>

      {/* Core Principles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-2 text-center">
          <Lock className="w-6 h-6 text-emerald-400 mx-auto" />
          <h3 className="text-sm font-bold text-slate-200">Zero Server Dependency</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Operates completely inside your web browser. No server API calls, databases, or third-party trackers.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-2 text-center">
          <Sparkles className="w-6 h-6 text-cyan-400 mx-auto" />
          <h3 className="text-sm font-bold text-slate-200">Human-Centered Math</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Balances brute-force entropy with natural word structures so passwords remain memorable for humans.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-2 text-center">
          <Code2 className="w-6 h-6 text-violet-400 mx-auto" />
          <h3 className="text-sm font-bold text-slate-200">Cryptographic Standard</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Uses high-entropy Web Crypto API (<code className="text-cyan-300 font-mono">crypto.getRandomValues</code>) to ensure random selection.
          </p>
        </div>

      </div>

      {/* Frequently Asked Questions */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
        <h2 className="text-lg font-bold text-slate-100">Frequently Asked Questions</h2>

        <div className="space-y-4 text-xs text-slate-300">
          
          <div className="space-y-1 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <h4 className="font-semibold text-slate-100 text-sm">Is SmartPass safe to use for my primary email or banking password?</h4>
            <p className="text-slate-400 leading-relaxed">
              Yes. Because all random generation happens client-side using standard browser cryptography and is never sent over any network or stored on any disk, your generated password is known only to you.
            </p>
          </div>

          <div className="space-y-1 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <h4 className="font-semibold text-slate-100 text-sm">Why doesn't SmartPass save my generated passwords?</h4>
            <p className="text-slate-400 leading-relaxed">
              Storing generated passwords in local storage or on servers creates a target for credential theft. True security means password creation tools should remain stateless. We recommend copying your password directly into a secure password manager.
            </p>
          </div>

          <div className="space-y-1 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <h4 className="font-semibold text-slate-100 text-sm">Why are memorable passphrases safer than short random passwords?</h4>
            <p className="text-slate-400 leading-relaxed">
              Short random passwords like <code className="text-slate-200">aB7!xQ</code> are easy for computers to crack in seconds and hard for humans to remember. A 4-word passphrase like <code className="text-emerald-300">Orbit-Mango7!River-Cactus</code> has over 85 bits of mathematical entropy while remaining visual and memorable to human brains.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}
