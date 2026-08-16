import React, { useState } from 'react';
import { calculateEntropy } from '../utils/entropyCalculator';
import { evaluatePasswordStrength } from '../utils/strengthAnalyzer';
import StrengthMeter from './StrengthMeter';
import EntropyDisplay from './EntropyDisplay';
import { ShieldCheck, Lock, Eye, EyeOff, Search, KeyRound, CheckCircle2 } from 'lucide-react';

export default function PasswordChecker({ onAddCheckerHistory }) {
  const [inputPassword, setInputPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [checkedData, setCheckedData] = useState(null);

  const handleCheckStrength = (e) => {
    if (e) e.preventDefault();
    if (!inputPassword || inputPassword.trim().length === 0) return;

    const isPassphraseLike = /[-._]/.test(inputPassword) && inputPassword.length >= 12;
    const detectedStyle = isPassphraseLike ? 'passphrase' : 'strong';

    const entropyInfo = calculateEntropy(inputPassword, detectedStyle);
    const strengthInfo = evaluatePasswordStrength(inputPassword, detectedStyle, entropyInfo.bits);

    setCheckedData({
      password: inputPassword,
      entropyInfo,
      strengthInfo
    });

    if (onAddCheckerHistory) {
      onAddCheckerHistory({
        password: inputPassword,
        label: strengthInfo.label,
        bits: entropyInfo.bits,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      });
    }
  };

  const handleInputChange = (e) => {
    setInputPassword(e.target.value);
    // Clear previous check output when user starts typing new password until they click Check Strength
    if (checkedData && e.target.value !== checkedData.password) {
      setCheckedData(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 text-center space-y-3">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-1">
          <Search className="w-6 h-6" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
          Password Security & Entropy Checker
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed">
          Type or paste your password below and click <strong className="text-emerald-400">Check Strength</strong> to evaluate its cryptographic bit entropy, character distribution, estimated brute-force crack duration, and memorability score.
        </p>

        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
          <Lock className="w-3.5 h-3.5" />
          <span>100% Private — Analysed strictly on your device</span>
        </div>
      </div>

      {/* Password Input Box Form */}
      <form onSubmit={handleCheckStrength} className="glass-card rounded-2xl p-6 border border-slate-700/80 shadow-2xl space-y-5">
        <div className="flex items-center justify-between">
          <label htmlFor="custom-password-input" className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 flex items-center space-x-2">
            <KeyRound className="w-4 h-4 text-emerald-400" />
            <span>Enter Password to Analyze</span>
          </label>

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-mono text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800"
          >
            {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{showPassword ? 'Hide' : 'Show'}</span>
          </button>
        </div>

        <div className="relative">
          <input
            id="custom-password-input"
            type={showPassword ? 'text' : 'password'}
            value={inputPassword}
            onChange={handleInputChange}
            placeholder="Type or paste your complete password here..."
            className="w-full bg-slate-950/90 text-emerald-300 font-mono text-lg sm:text-xl font-bold rounded-xl px-4 py-4 border border-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 placeholder:text-slate-600 placeholder:text-sm placeholder:font-sans"
          />
        </div>

        {/* Check Strength Action Button */}
        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-slate-500 italic">
            Click Check Strength after typing to run complete security analysis.
          </p>

          <button
            type="submit"
            disabled={!inputPassword || inputPassword.trim().length === 0}
            className="flex items-center space-x-2 px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-slate-950 shadow-cyber-glow hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Check Strength</span>
          </button>
        </div>
      </form>

      {/* Analysis Results (Rendered ONLY after user clicks Check Strength) */}
      {checkedData && (
        <div className="space-y-6 animate-fadeIn">
          {/* Strength Meter & Memorability Score */}
          <StrengthMeter strengthInfo={checkedData.strengthInfo} />

          {/* Cryptographic Entropy & Character Distribution */}
          <EntropyDisplay entropyInfo={checkedData.entropyInfo} />
        </div>
      )}

    </div>
  );
}
