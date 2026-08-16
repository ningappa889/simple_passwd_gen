import React, { useState } from 'react';
import { X, Copy, Check, Trash2, Cpu, ShieldCheck, KeyRound, Search, ShieldAlert } from 'lucide-react';

export default function HistoryDrawer({
  isOpen,
  onClose,
  generatorHistory = [],
  checkerHistory = [],
  onClearHistory
}) {
  const [activeHistoryTab, setActiveHistoryTab] = useState('generator');
  const [copiedIndex, setCopiedIndex] = useState(null);

  if (!isOpen) return null;

  const handleCopy = (pwd, index) => {
    navigator.clipboard.writeText(pwd);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const currentList = activeHistoryTab === 'generator' ? generatorHistory : checkerHistory;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="glass-panel w-full max-w-md h-full p-6 border-l border-slate-700 shadow-2xl flex flex-col justify-between">
        
        <div className="space-y-4 flex-1 flex flex-col overflow-hidden">
          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <Cpu className="w-5 h-5 text-emerald-400" />
              <h2 className="text-base font-bold text-slate-100">Session History</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Section Tabs: Generator vs Checker */}
          <div className="grid grid-cols-2 gap-2 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveHistoryTab('generator')}
              className={`flex items-center justify-center space-x-1.5 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                activeHistoryTab === 'generator'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Generator History</span>
              {generatorHistory.length > 0 && (
                <span className="px-1.5 py-0.2 bg-emerald-500 text-slate-950 text-[10px] font-bold rounded-full ml-1">
                  {generatorHistory.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveHistoryTab('checker')}
              className={`flex items-center justify-center space-x-1.5 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                activeHistoryTab === 'checker'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Checker History</span>
              {checkerHistory.length > 0 && (
                <span className="px-1.5 py-0.2 bg-cyan-500 text-slate-950 text-[10px] font-bold rounded-full ml-1">
                  {checkerHistory.length}
                </span>
              )}
            </button>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400">
            <p className="flex items-center space-x-1.5 text-emerald-400 font-medium mb-0.5">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>In-Memory Non-Persistent History</span>
            </p>
            Erased automatically when you refresh or close this browser tab.
          </div>

          {/* History List */}
          <div className="overflow-y-auto flex-1 space-y-2.5 pr-1">
            {currentList.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-xs space-y-1">
                <p className="font-semibold text-slate-400">No {activeHistoryTab === 'generator' ? 'generated' : 'checked'} passwords yet.</p>
                <p>
                  {activeHistoryTab === 'generator'
                    ? 'Generate passwords to track them here.'
                    : 'Click "Check Strength" in Password Checker to save evaluations here.'}
                </p>
              </div>
            ) : (
              currentList.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between group hover:border-slate-700 transition-all"
                >
                  <div className="truncate mr-2">
                    <div className="flex items-center space-x-2 text-xs font-mono mb-1">
                      {activeHistoryTab === 'generator' ? (
                        <span className="text-emerald-400 font-semibold">{item.accountName}</span>
                      ) : (
                        <span className={`font-semibold px-2 py-0.5 rounded text-[10px] ${
                          item.label === 'Very Strong' || item.label === 'Strong'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : item.label === 'Moderate'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-red-500/20 text-red-300 border border-red-500/30'
                        }`}>
                          {item.label} • {item.bits} bits
                        </span>
                      )}
                      <span className="text-slate-500">• {item.timestamp}</span>
                    </div>

                    <span className="font-mono text-sm font-bold text-slate-200 truncate block">
                      {item.password}
                    </span>
                  </div>

                  <button
                    onClick={() => handleCopy(item.password, idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-all ${
                      copiedIndex === idx
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-slate-800 text-slate-300 hover:bg-emerald-500/20 hover:text-emerald-300'
                    }`}
                  >
                    {copiedIndex === idx ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Drawer Footer */}
        {(generatorHistory.length > 0 || checkerHistory.length > 0) && (
          <div className="pt-4 border-t border-slate-800">
            <button
              onClick={() => onClearHistory(activeHistoryTab)}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-semibold transition-all"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear {activeHistoryTab === 'generator' ? 'Generator' : 'Checker'} History</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
