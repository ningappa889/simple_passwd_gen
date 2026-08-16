import React, { useState } from 'react';
import { X, Copy, Check, Trash2, Cpu, ShieldCheck } from 'lucide-react';

export default function HistoryDrawer({ isOpen, onClose, history, onClearHistory }) {
  const [copiedIndex, setCopiedIndex] = useState(null);

  if (!isOpen) return null;

  const handleCopy = (pwd, index) => {
    navigator.clipboard.writeText(pwd);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="glass-panel w-full max-w-md h-full p-6 border-l border-slate-700 shadow-2xl flex flex-col justify-between">
        
        <div className="space-y-4 flex-1 flex flex-col overflow-hidden">
          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
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

          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400">
            <p className="flex items-center space-x-1.5 text-emerald-400 font-medium mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>In-Memory Non-Persistent Storage</span>
            </p>
            This history exists strictly in React temporary runtime memory. It will be erased automatically when you refresh or close this browser tab.
          </div>

          {/* History List */}
          <div className="overflow-y-auto flex-1 space-y-2.5 pr-1">
            {history.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-xs">
                No passwords generated in this session yet.
              </div>
            ) : (
              history.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between group hover:border-slate-700 transition-all"
                >
                  <div className="truncate mr-2">
                    <span className="text-xs text-slate-400 font-mono block mb-0.5">
                      {item.accountName} • {item.timestamp}
                    </span>
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
        {history.length > 0 && (
          <div className="pt-4 border-t border-slate-800">
            <button
              onClick={onClearHistory}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-semibold transition-all"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear Session History</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
