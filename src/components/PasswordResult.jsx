import React, { useState } from 'react';
import { Copy, Check, Eye, EyeOff, RefreshCw, Layers, Sparkles, Key, ShieldCheck } from 'lucide-react';

export default function PasswordResult({
  password,
  onGenerate,
  onOpenBatch,
  onOpenHistory
}) {
  const [copied, setCopied] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [isRotating, setIsRotating] = useState(false);

  const handleCopy = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegenerate = () => {
    setIsRotating(true);
    onGenerate();
    setTimeout(() => setIsRotating(false), 400);
  };

  return (
    <div className="space-y-4">
      
      {/* Large Generate Button */}
      <button
        onClick={handleRegenerate}
        className="w-full group relative inline-flex items-center justify-center p-4 overflow-hidden rounded-2xl font-semibold text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 shadow-cyber-glow hover:shadow-[0_0_35px_rgba(16,185,129,0.4)] transition-all duration-300 active:scale-[0.99]"
      >
        <span className="flex items-center space-x-2 text-base font-bold tracking-wide">
          <RefreshCw className={`w-5 h-5 transition-transform duration-500 ${isRotating ? 'rotate-180' : 'group-hover:rotate-45'}`} />
          <span>Generate Secure Password</span>
        </span>
      </button>

      {/* Main Password Output Box */}
      <div className="glass-card rounded-2xl p-6 border border-slate-700/80 shadow-2xl relative">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
            <Key className="w-3.5 h-3.5 text-emerald-400" />
            <span>Your Generated Password</span>
          </span>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Password Display Field */}
        <div className="relative flex items-center justify-between p-4 my-2 rounded-xl bg-slate-950/90 border border-slate-800 text-emerald-300 font-mono text-lg sm:text-2xl font-bold tracking-wide break-all select-all min-h-[64px]">
          {showPassword ? (
            <span>{password}</span>
          ) : (
            <span className="tracking-widest text-slate-500 font-sans">
              {'•'.repeat(Math.min(24, password.length))}
            </span>
          )}

          {copied && (
            <span className="absolute right-4 top-4 px-2.5 py-1 bg-emerald-500 text-slate-950 font-sans text-xs font-bold rounded-lg shadow-md animate-bounce">
              Copied!
            </span>
          )}
        </div>

        {/* Action Controls Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-2 mt-4 pt-4 border-t border-slate-800/80">
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-semibold text-xs transition-all ${
                copied
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/40'
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied to Clipboard' : 'Copy Password'}</span>
            </button>

            <button
              onClick={handleRegenerate}
              className="flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-medium transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} />
              <span>Regenerate</span>
            </button>
          </div>

          <button
            onClick={onOpenBatch}
            className="flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-cyan-400 border border-slate-700/80 text-xs font-mono font-medium transition-all"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Generate Multiple (Batch)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
