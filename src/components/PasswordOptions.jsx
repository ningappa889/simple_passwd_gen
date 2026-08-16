import React from 'react';
import { Sparkles, ShieldCheck, Zap, SlidersHorizontal, Hash, Type, CaseSensitive, Binary } from 'lucide-react';

export default function PasswordOptions({
  style,
  setStyle,
  length,
  setLength,
  includeUppercase,
  setIncludeUppercase,
  includeLowercase,
  setIncludeLowercase,
  includeNumbers,
  setIncludeNumbers,
  includeSymbols,
  setIncludeSymbols
}) {
  const styleOptions = [
    {
      id: 'passphrase',
      name: 'Memorable Passphrase',
      badge: 'Recommended for Humans',
      desc: 'Random words + number + symbol (e.g. Orbit-Mango7!River-Cactus)',
      icon: Sparkles,
      color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/50 text-emerald-300'
    },
    {
      id: 'strong',
      name: 'Strong Password',
      badge: 'Balanced Cryptographic',
      desc: 'Random mixed characters (e.g. vG7!qL9@xP2#kM8)',
      icon: ShieldCheck,
      color: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/50 text-cyan-300'
    },
    {
      id: 'max',
      name: 'Maximum Security',
      badge: 'Extended High Entropy',
      desc: '24-32 chars extended random noise for password managers',
      icon: Zap,
      color: 'from-violet-500/20 to-purple-500/10 border-violet-500/50 text-violet-300'
    }
  ];

  const quickLengths = [12, 16, 20, 24, 32];

  const handleNumberChange = (e) => {
    const rawVal = e.target.value;
    if (rawVal === '') {
      setLength('');
      return;
    }
    const val = parseInt(rawVal, 10);
    if (!isNaN(val)) {
      setLength(Math.max(8, Math.min(64, val)));
    }
  };

  return (
    <div className="glass-card rounded-2xl p-5 border border-slate-800 shadow-xl space-y-6">
      
      {/* Password Style Picker */}
      <div>
        <label className="text-sm font-semibold text-slate-200 flex items-center space-x-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
          <span>2. Choose Password Style</span>
        </label>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {styleOptions.map((opt) => {
            const IconComp = opt.icon;
            const isSelected = style === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setStyle(opt.id)}
                className={`p-4 rounded-xl border text-left flex flex-col justify-between transition-all duration-200 relative overflow-hidden ${
                  isSelected
                    ? `bg-gradient-to-b ${opt.color} shadow-lg scale-[1.01]`
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <IconComp className={`w-5 h-5 ${isSelected ? 'text-emerald-400' : 'text-slate-500'}`} />
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-950/60 border border-slate-700 text-slate-300">
                      {opt.badge}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-100 mb-1">{opt.name}</h3>
                  <p className="text-xs text-slate-400 leading-snug">{opt.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Password Length Section: Direct Input + Slider + Presets */}
      <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800/80 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <label htmlFor="password-length-input" className="text-sm font-semibold text-slate-200 flex items-center space-x-2">
            <SlidersHorizontal className="w-4 h-4 text-emerald-400" />
            <span>3. Password Length</span>
          </label>

          {/* Interactive Direct Number Input Box */}
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-400 font-mono">Set Length:</span>
            <div className="flex items-center bg-slate-900 border border-emerald-500/60 focus-within:border-emerald-400 focus-within:ring-1 focus-within:ring-emerald-400 rounded-xl px-3 py-1 space-x-1 shadow-inner">
              <input
                id="password-length-input"
                type="number"
                min="8"
                max="64"
                value={length}
                onChange={handleNumberChange}
                className="w-12 bg-transparent text-emerald-400 font-mono font-bold text-base text-center focus:outline-none"
              />
              <span className="text-xs text-slate-400 font-mono">chars</span>
            </div>
          </div>
        </div>

        {/* Quick Length Preset Pills */}
        <div className="flex items-center space-x-2">
          <span className="text-[11px] text-slate-500 font-mono">Presets:</span>
          <div className="flex flex-wrap gap-1.5">
            {quickLengths.map((qLen) => (
              <button
                key={qLen}
                type="button"
                onClick={() => setLength(qLen)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-all ${
                  length === qLen
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {qLen}
              </button>
            ))}
          </div>
        </div>

        {/* Sync Range Slider */}
        <div className="space-y-1 pt-1">
          <input
            id="password-length-slider"
            type="range"
            min="12"
            max="32"
            value={typeof length === 'number' ? length : 16}
            onChange={(e) => setLength(parseInt(e.target.value, 10))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 focus:outline-none"
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-500">
            <span>12 (Short)</span>
            <span>20 (Balanced)</span>
            <span>32 (Max)</span>
          </div>
        </div>
      </div>

      {/* Character Options Checkboxes */}
      <div>
        <label className="text-sm font-semibold text-slate-200 flex items-center space-x-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-violet-400"></span>
          <span>4. Character Sets</span>
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          
          <label className={`flex items-center space-x-3 p-3.5 rounded-xl border cursor-pointer select-none transition-all ${
            includeUppercase ? 'bg-slate-900/90 border-emerald-500/60 text-slate-100 shadow-sm' : 'bg-slate-950/40 border-slate-800/80 text-slate-500'
          }`}>
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
              className="w-4.5 h-4.5 rounded border-slate-700 bg-slate-950 text-emerald-500 focus:ring-emerald-500 cursor-pointer"
            />
            <div className="flex items-center space-x-1.5">
              <CaseSensitive className={`w-4 h-4 ${includeUppercase ? 'text-emerald-400' : 'text-slate-600'}`} />
              <span className="text-xs font-semibold">Uppercase (A-Z)</span>
            </div>
          </label>

          <label className={`flex items-center space-x-3 p-3.5 rounded-xl border cursor-pointer select-none transition-all ${
            includeLowercase ? 'bg-slate-900/90 border-emerald-500/60 text-slate-100 shadow-sm' : 'bg-slate-950/40 border-slate-800/80 text-slate-500'
          }`}>
            <input
              type="checkbox"
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
              className="w-4.5 h-4.5 rounded border-slate-700 bg-slate-950 text-emerald-500 focus:ring-emerald-500 cursor-pointer"
            />
            <div className="flex items-center space-x-1.5">
              <Type className={`w-4 h-4 ${includeLowercase ? 'text-cyan-400' : 'text-slate-600'}`} />
              <span className="text-xs font-semibold">Lowercase (a-z)</span>
            </div>
          </label>

          <label className={`flex items-center space-x-3 p-3.5 rounded-xl border cursor-pointer select-none transition-all ${
            includeNumbers ? 'bg-slate-900/90 border-emerald-500/60 text-slate-100 shadow-sm' : 'bg-slate-950/40 border-slate-800/80 text-slate-500'
          }`}>
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              className="w-4.5 h-4.5 rounded border-slate-700 bg-slate-950 text-emerald-500 focus:ring-emerald-500 cursor-pointer"
            />
            <div className="flex items-center space-x-1.5">
              <Binary className={`w-4 h-4 ${includeNumbers ? 'text-amber-400' : 'text-slate-600'}`} />
              <span className="text-xs font-semibold">Numbers (0-9)</span>
            </div>
          </label>

          <label className={`flex items-center space-x-3 p-3.5 rounded-xl border cursor-pointer select-none transition-all ${
            includeSymbols ? 'bg-slate-900/90 border-emerald-500/60 text-slate-100 shadow-sm' : 'bg-slate-950/40 border-slate-800/80 text-slate-500'
          }`}>
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              className="w-4.5 h-4.5 rounded border-slate-700 bg-slate-950 text-emerald-500 focus:ring-emerald-500 cursor-pointer"
            />
            <div className="flex items-center space-x-1.5">
              <Hash className={`w-4 h-4 ${includeSymbols ? 'text-violet-400' : 'text-slate-600'}`} />
              <span className="text-xs font-semibold">Symbols (!@#$)</span>
            </div>
          </label>

        </div>
      </div>
    </div>
  );
}
