import React from 'react';
import { ShieldCheck, Lock, History, BookOpen, Info, KeyRound, Search } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, historyCount, onOpenHistory }) {
  const navItems = [
    { id: 'generator', label: 'Generator', icon: KeyRound },
    { id: 'checker', label: 'Password Checker', icon: Search },
    { id: 'how-it-works', label: 'How It Works', icon: BookOpen },
    { id: 'security', label: 'Security', icon: ShieldCheck },
    { id: 'about', label: 'About', icon: Info }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80 shadow-lg shadow-black/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-2 sm:gap-4">
          
          {/* Logo & Branding */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group shrink-0" 
            onClick={() => setActiveTab('generator')}
          >
            <div className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 shadow-cyber-glow group-hover:scale-105 transition-transform duration-200">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-slate-950 font-bold" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-ping opacity-75" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                  SmartPass
                </span>
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full">
                  v2.5
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden lg:block">
                Strong passwords. Easy to remember.
              </p>
            </div>
          </div>

          {/* Navigation Tabs (Center) */}
          <nav className="hidden md:flex items-center space-x-1 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800/80 shadow-inner my-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 lg:px-3.5 lg:py-2 text-xs lg:text-sm font-medium rounded-xl transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm shadow-emerald-950/50 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 lg:w-4 lg:h-4 transition-colors ${isActive ? 'text-emerald-400' : 'text-slate-500 group-hover:text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls: History & Client-Side Badge - Compact for visual symmetry */}
          <div className="flex items-center space-x-2 shrink-0">
            
            {/* Session History Button - Compact & Sleek */}
            <button
              onClick={onOpenHistory}
              className="relative flex items-center space-x-2 px-2.5 sm:px-3 py-1.5 text-xs font-medium rounded-xl bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700/70 hover:border-emerald-500/40 text-slate-200 hover:text-emerald-300 transition-all duration-200 shadow-sm group cursor-pointer"
              title="View in-memory session password history"
            >
              <History className="w-3.5 h-3.5 text-emerald-400 group-hover:rotate-[-12deg] transition-transform duration-200" />
              <span className="hidden sm:inline font-mono font-medium">History</span>
              {historyCount > 0 && (
                <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold bg-emerald-500 text-slate-950 rounded-full shadow-sm shadow-emerald-500/30">
                  {historyCount}
                </span>
              )}
            </button>

            {/* 100% Client-Side Trust Badge - Compact & Sleek */}
            <div 
              className="hidden lg:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium"
              title="Zero server calls. All password generation and calculations stay 100% in your browser."
            >
              <div className="relative flex items-center justify-center w-2 h-2">
                <span className="absolute w-full h-full rounded-full bg-emerald-400 animate-ping opacity-75" />
                <span className="relative w-2 h-2 rounded-full bg-emerald-400" />
              </div>
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Client-Side</span>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="flex md:hidden items-center justify-around py-2.5 border-t border-slate-800/60 overflow-x-auto gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium rounded-xl transition-all ${
                  isActive
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="whitespace-nowrap">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
