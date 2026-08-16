import React from 'react';
import { BookOpen, ShieldAlert, Cpu, Sparkles, CheckCircle2, XCircle } from 'lucide-react';

export default function HowItWorks() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 text-center space-y-3">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
          <BookOpen className="w-6 h-6" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
          How SmartPass Balances Security & Memorability
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed">
          Traditional advice forces a compromise between unrememberable noise (`vG7!qL9@xP2#`) and predictable insecure patterns (`Google@2026`). SmartPass uses cryptographic randomness to generate high-entropy passphrases.
        </p>
      </div>

      {/* Comparison: Insecure vs SmartPass */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Insecure Predictable Patterns */}
        <div className="glass-card rounded-2xl p-6 border border-red-500/30 space-y-4 bg-red-950/10">
          <div className="flex items-center space-x-2 text-red-400">
            <XCircle className="w-5 h-5" />
            <h3 className="font-bold text-base text-slate-100">Predictable Insecure Patterns</h3>
          </div>
          
          <div className="space-y-2 font-mono text-xs text-red-300 bg-slate-950/80 p-3.5 rounded-xl border border-red-500/20">
            <p>✖ Email@1234</p>
            <p>✖ Google@2026</p>
            <p>✖ Instagram@123</p>
            <p>✖ GitHub-River123!</p>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            <strong className="text-slate-200">Why these fail: </strong> 
            Attackers do not guess passwords randomly; they use rule-based tools (like Hashcat) configured with wordlists + common suffixes (`@123`, `2026`). Appending the site name or standard year provides zero real security.
          </p>
        </div>

        {/* Cryptographic Passphrases */}
        <div className="glass-card rounded-2xl p-6 border border-emerald-500/30 space-y-4 bg-emerald-950/10">
          <div className="flex items-center space-x-2 text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
            <h3 className="font-bold text-base text-slate-100">Cryptographic Memorable Passphrases</h3>
          </div>

          <div className="space-y-2 font-mono text-xs text-emerald-300 bg-slate-950/80 p-3.5 rounded-xl border border-emerald-500/20">
            <p>✔ Orbit-Mango7!River-Cactus</p>
            <p>✔ Silver!Falcon82-Cloud</p>
            <p>✔ Cobra-Tundra49!Summit</p>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            <strong className="text-slate-200">Why these succeed: </strong>
            Words are selected randomly from a dictionary of 1,200+ terms using <code className="text-emerald-300">crypto.getRandomValues()</code>. Combining 4 random words yields over 85+ bits of true entropy, requiring billions of years to crack.
          </p>
        </div>

      </div>

      {/* Mathematical Entropy Explanation */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-5">
        <div className="flex items-center space-x-3">
          <Cpu className="w-6 h-6 text-cyan-400" />
          <h2 className="text-lg font-bold text-slate-100">The Mathematics of Entropy</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-slate-300 leading-relaxed">
          <div className="space-y-2 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <h4 className="font-semibold text-emerald-400 text-sm">Random String Formula</h4>
            <p className="font-mono text-slate-400">E = L × log₂(Pool Size)</p>
            <p>
              A 16-character password chosen from 94 ASCII characters provides \(16 \times \log_2(94) \approx 105\) bits of entropy. High security, but extremely hard to memorize manually.
            </p>
          </div>

          <div className="space-y-2 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <h4 className="font-semibold text-cyan-400 text-sm">Passphrase Diceware Formula</h4>
            <p className="font-mono text-slate-400">E = W × log₂(Wordlist Size) + Extra Bits</p>
            <p>
              A 4-word passphrase chosen randomly from a 1,200 word dictionary plus a 2-digit number and symbol gives \(4 \times 10.2 + 6.6 + 4.7 \approx 52+\) bits of pure word entropy plus character variations.
            </p>
          </div>
        </div>
      </div>

      {/* Account Policy Principles */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-3">
        <h3 className="font-bold text-base text-slate-100 flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-violet-400" />
          <span>Account-Specific Policies without Predictable Tags</span>
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed">
          Selecting <strong>Banking</strong> or <strong>Wi-Fi</strong> adjusts parameters like word count, character set enforcement, and hyphenation—it NEVER appends the website name. 
          For example, selecting <strong>Banking</strong> enforces Maximum Security with 24+ characters and full character diversity, ensuring high-risk credentials meet financial compliance standards.
        </p>
      </div>

    </div>
  );
}
