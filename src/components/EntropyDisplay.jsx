import React from 'react';
import { Cpu, Clock, Layers, Lock, ShieldAlert, Sparkles } from 'lucide-react';

export default function EntropyDisplay({ entropyInfo = {} }) {
  const {
    bits = 0,
    rawBits = 0,
    poolSize = 0,
    crackTimeDisplay = 'Instant',
    rawCrackTimeDisplay = '',
    hasPenalty = false,
    penaltyReason = null,
    charBreakdown = { lower: 0, upper: 0, number: 0, symbol: 0, length: 0 }
  } = entropyInfo || {};

  return (
    <div className="glass-card rounded-2xl p-5 border border-slate-800 shadow-xl space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Cpu className="w-5 h-5 text-cyan-400" />
          <h3 className="text-sm font-semibold text-slate-200">Cryptographic Entropy & Metrics</h3>
        </div>
        <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
          Local Calculation
        </span>
      </div>

      {/* Bit Entropy Big Card */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        
        <div className={`p-3.5 rounded-xl bg-slate-950/70 border text-center ${hasPenalty ? 'border-amber-500/40 bg-amber-950/10' : 'border-slate-800'}`}>
          <span className="text-xs font-mono text-slate-400 block mb-1">
            {hasPenalty ? 'Effective Entropy' : 'Shannon Entropy'}
          </span>
          <span className={`text-2xl font-bold font-mono ${hasPenalty ? 'text-amber-400' : 'bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent'}`}>
            {bits} bits
          </span>
          <span className="text-[10px] text-slate-500 block mt-1">
            {hasPenalty && rawBits > 0 ? (
              <span className="text-amber-400/90 font-mono">⚠️ Reduced from {rawBits} bits</span>
            ) : (
              'Randomness Density'
            )}
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-center">
          <span className="text-xs font-mono text-slate-400 block mb-1">Character Pool</span>
          <span className="text-2xl font-bold font-mono text-cyan-300">
            {poolSize > 0 ? `${poolSize} chars` : 'Wordlist'}
          </span>
          <span className="text-[10px] text-slate-500 block mt-1">Active Combination Space</span>
        </div>

        <div className={`p-3.5 rounded-xl bg-slate-950/70 border text-center ${hasPenalty ? 'border-rose-500/40 bg-rose-950/10' : 'border-slate-800'}`}>
          <span className="text-xs font-mono text-slate-400 block mb-1">Brute-Force Estimate</span>
          <span className={`text-base font-bold font-mono truncate block ${hasPenalty ? 'text-rose-400' : 'text-emerald-300'}`}>
            {crackTimeDisplay}
          </span>
          <span className="text-[10px] text-slate-500 block mt-1">
            {hasPenalty ? (
              <span className="text-rose-400/90 font-mono font-semibold">⚠️ {penaltyReason || 'Targeted OSINT Attack'}</span>
            ) : (
              'At 100B guesses/sec'
            )}
          </span>
        </div>

      </div>

      {/* Character Breakdown Tags */}
      {charBreakdown && (
        <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/80">
          <span className="text-xs font-mono text-slate-400 block mb-2">Character Distribution:</span>
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
              Length: <strong className="text-emerald-400">{charBreakdown.length}</strong>
            </span>
            <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
              Lowercase: <strong className="text-cyan-400">{charBreakdown.lower}</strong>
            </span>
            <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
              Uppercase: <strong className="text-emerald-400">{charBreakdown.upper}</strong>
            </span>
            <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
              Numbers: <strong className="text-amber-400">{charBreakdown.number}</strong>
            </span>
            <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
              Symbols: <strong className="text-violet-400">{charBreakdown.symbol}</strong>
            </span>
          </div>
        </div>
      )}

      {/* Security Disclaimer Notice */}
      <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 flex items-start space-x-2.5">
        <ShieldAlert className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-slate-200">Security Notice: </strong>
          Designed to be resistant to common password attacks when generated and used correctly. 
          No password can be guaranteed 100% unbreakable — security relies equally on avoiding reuse, 
          enabling Multi-Factor Authentication (MFA), and using a trusted password manager.
        </p>
      </div>
    </div>
  );
}
