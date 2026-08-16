import React from 'react';
import { ShieldCheck, Lock, Cpu, Eye, BookOpen, Info, Sparkles, KeyRound, Search } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, historyCount, onOpenHistory }) {
  const navItems = [
    { id: 'generator', label: 'Generator', icon: KeyRound },
    { id: 'checker', label: 'Password Checker', icon: Search },
    { id: 'how-it-works', label: 'How It Works', icon: BookOpen },
    { id: 'security', label: 'Security', icon: ShieldCheck },
    { id: 'about', label: 'About', icon: Info }
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Branding */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('generator')}>
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 shadow-cyber-glow">
              <ShieldCheck className="w-6 h-6 text-slate-950 font-bold" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-ping" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                  SmartPass
                </span>
                <span className="px-2 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full">
                  v2.5 Crypto
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Strong passwords. Easy to remember. Unique for every account.
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1 bg-slate-900/60 p-1.5 rounded-xl border border-slate-800">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls: History & Zero-Server Badge */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onOpenHistory}
              className="relative flex items-center space-x-2 px-3 py-2 text-xs font-mono font-medium rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-300 transition-all"
              title="View in-memory session password history"
            >
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Session History</span>
              {historyCount > 0 && (
                <span className="px-1.5 py-0.5 text-[10px] font-bold bg-emerald-500 text-slate-950 rounded-full">
                  {historyCount}
                </span>
              )}
            </button>

            <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
              <Lock className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>100% Client-Side</span>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-slate-800/60 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium rounded-lg ${
                  isActive
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'text-slate-400'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
