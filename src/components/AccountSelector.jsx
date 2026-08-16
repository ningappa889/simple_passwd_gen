import React from 'react';
import { ACCOUNT_TYPES } from '../data/accountPolicies';
import { 
  Mail, Chrome, GitBranch, Landmark, CreditCard, Share2, 
  GraduationCap, Briefcase, ShoppingBag, Wifi, Sliders, ShieldAlert, CheckCircle2
} from 'lucide-react';

const iconMap = {
  Mail, Chrome, GitBranch, Landmark, CreditCard, Share2,
  GraduationCap, Briefcase, ShoppingBag, Wifi, Sliders
};

export default function AccountSelector({ selectedAccount, onSelectAccount }) {
  const currentAccount = ACCOUNT_TYPES.find(a => a.id === selectedAccount) || ACCOUNT_TYPES[0];

  return (
    <div className="glass-card rounded-2xl p-5 border border-slate-800 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <label htmlFor="account-type-select" className="text-sm font-semibold text-slate-200 flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>1. Select Account Type</span>
          </label>
          <p className="text-xs text-slate-400 mt-0.5">
            Applies tailored security rules without creating predictable passwords.
          </p>
        </div>

        <span className="self-start sm:self-auto px-2.5 py-1 text-xs font-mono rounded-full bg-slate-800 text-cyan-400 border border-slate-700">
          Category: {currentAccount.category}
        </span>
      </div>

      {/* Account Type Dropdown */}
      <div className="relative mb-5">
        <select
          id="account-type-select"
          value={selectedAccount}
          onChange={(e) => onSelectAccount(e.target.value)}
          className="w-full appearance-none bg-slate-950/90 text-slate-100 text-sm font-medium rounded-xl px-4 py-3 border border-slate-700/80 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 cursor-pointer shadow-inner"
        >
          {ACCOUNT_TYPES.map((acc) => (
            <option key={acc.id} value={acc.id} className="bg-slate-900 text-slate-100">
              {acc.name} — ({acc.description})
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </div>

      {/* Fast Selector Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 mb-4">
        {ACCOUNT_TYPES.map((acc) => {
          const IconComponent = iconMap[acc.icon] || Sliders;
          const isSelected = acc.id === selectedAccount;
          return (
            <button
              key={acc.id}
              onClick={() => onSelectAccount(acc.id)}
              className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all duration-200 group ${
                isSelected
                  ? 'bg-gradient-to-b from-emerald-500/20 to-teal-500/10 border-emerald-500 text-emerald-300 shadow-cyber-glow scale-[1.02]'
                  : 'bg-slate-900/50 border-slate-800/80 text-slate-400 hover:bg-slate-800/60 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <IconComponent className={`w-5 h-5 mb-1.5 transition-transform group-hover:scale-110 ${
                isSelected ? 'text-emerald-400' : 'text-slate-500'
              }`} />
              <span className="text-xs font-medium truncate w-full">{acc.name.split('/')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Account Guidance Banner */}
      <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start space-x-3">
        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-xs font-semibold text-slate-200">
            Security Policy for {currentAccount.name}
          </h4>
          <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
            {currentAccount.guidance}
          </p>
        </div>
      </div>
    </div>
  );
}
