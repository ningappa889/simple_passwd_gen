import React, { useState, useEffect } from 'react';
import { X, Copy, Check, RefreshCw, Layers, Sparkles } from 'lucide-react';
import { generatePassword } from '../utils/passwordGenerator';

export default function BatchGenerator({ isOpen, onClose, currentOptions }) {
  const [passwords, setPasswords] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const generateBatch = () => {
    const newBatch = [];
    for (let i = 0; i < 6; i++) {
      newBatch.push(generatePassword(currentOptions));
    }
    setPasswords(newBatch);
  };

  useEffect(() => {
    if (isOpen) {
      generateBatch();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopyItem = (pwd, index) => {
    navigator.clipboard.writeText(pwd);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel w-full max-w-2xl rounded-2xl p-6 border border-slate-700 shadow-2xl space-y-4 max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-slate-100">Multiple Password Batch Generator</h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-400">
          Generated 6 candidate options using your current parameters ({currentOptions.style} mode, {currentOptions.length} chars). Click any password to copy.
        </p>

        {/* Passwords List */}
        <div className="space-y-2.5 overflow-y-auto flex-1 pr-1 my-2">
          {passwords.map((pwd, idx) => (
            <div
              key={idx}
              onClick={() => handleCopyItem(pwd, idx)}
              className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-850 border border-slate-800/80 hover:border-emerald-500/50 cursor-pointer group transition-all"
            >
              <span className="font-mono text-sm sm:text-base font-bold text-slate-200 group-hover:text-emerald-300 break-all">
                {pwd}
              </span>

              <button
                type="button"
                className={`ml-3 shrink-0 flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  copiedIndex === idx
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-300 group-hover:bg-emerald-500/20 group-hover:text-emerald-300'
                }`}
              >
                {copiedIndex === idx ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedIndex === idx ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          ))}
        </div>

        {/* Modal Footer Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <button
            onClick={generateBatch}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 text-xs font-semibold transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Generate New Batch</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-semibold transition-all"
          >
            Close Window
          </button>
        </div>

      </div>
    </div>
  );
}
