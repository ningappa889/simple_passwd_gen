import React from 'react';
import { ShieldCheck, Brain, AlertTriangle, ShieldAlert } from 'lucide-react';

export default function StrengthMeter({ strengthInfo = {} }) {
  const {
    label = 'Weak',
    color = 'bg-red-500',
    textColor = 'text-red-400',
    borderColor = 'border-red-500/40',
    percent = 25,
    memorability = 'Low',
    memorabilityExplanation = 'Evaluating password structure...',
    breachInfo = {},
    warnings = []
  } = strengthInfo || {};

  const isHigh = memorability && typeof memorability === 'string' && memorability.includes('High');
  const isBreached = label === 'Breachable' || (breachInfo && breachInfo.isBreached);

  return (
    <div className="glass-card rounded-2xl p-5 border border-slate-800 shadow-xl space-y-5">
      
      {/* Top Header & Visual Meter */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            {isBreached ? (
              <ShieldAlert className="w-5 h-5 text-rose-500 animate-bounce" />
            ) : (
              <ShieldCheck className={`w-5 h-5 ${textColor}`} />
            )}
            <span className="text-sm font-semibold text-slate-200">Password Strength:</span>
            <span className={`text-sm font-bold font-mono px-2.5 py-0.5 rounded-md border ${borderColor} ${textColor} ${
              isBreached ? 'bg-rose-950/80 animate-pulse' : 'bg-slate-950/60'
            }`}>
              {label}
            </span>
          </div>

          <span className="text-xs font-mono text-slate-400">{percent}% Resistance</span>
        </div>

        {/* Visual Progress Bar Meter */}
        <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
          <div
            className={`h-full rounded-full transition-all duration-500 ${color}`}
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {/* Prominent Data Breach Warning Banner if password is known breached */}
      {isBreached && (
        <div className="p-4 rounded-xl bg-rose-950/80 border border-rose-500/80 space-y-2 animate-fadeIn shadow-[0_0_20px_rgba(244,63,94,0.3)]">
          <div className="flex items-center space-x-2 text-rose-300 font-extrabold text-sm">
            <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0" />
            <span>🚨 HIGH RISK: LEAKED IN PUBLIC DATA BREACHES</span>
          </div>
          <p className="text-xs text-rose-200 leading-relaxed">
            This password appears directly in known compromised password dictionaries (e.g. RockYou, HaveIBeenPwned leaks). Hackers attempt this password automatically using credential stuffing scripts. <strong>DO NOT USE THIS PASSWORD FOR ANY ACCOUNT!</strong>
          </p>
        </div>
      )}

      {/* Memorability Score Section */}
      <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-semibold text-slate-200">Memorability Score:</span>
          </div>

          <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full ${
            isBreached
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
              : isHigh
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              : memorability === 'Medium'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              : 'bg-slate-800 text-slate-400 border border-slate-700'
          }`}>
            Memorability: {memorability}
          </span>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed italic">
          "{memorabilityExplanation}"
        </p>
      </div>

      {/* Warning callouts if any predictable pattern detected */}
      {warnings && warnings.length > 0 && !isBreached && (
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start space-x-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-300">
            <span className="font-semibold">Security Suggestion: </span>
            {warnings.join(' ')}
          </div>
        </div>
      )}
    </div>
  );
}
